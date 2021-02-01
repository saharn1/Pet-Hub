import React, {useEffect, useState} from 'react';
import {Platform, ScrollView} from 'react-native';
import {Input, Text, Image, Button, Card} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/ApiHooks';

const Upload = () => {
  const [image, setImage] = useState(null);
  const {upload} = useMedia();

  const {handleInputChange, inputs} = useUploadForm();

  const doUpload = async () => {
    const formData = new FormData();
    // add text to formData
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);
    // add image to formData
    formData.append('file', {uri: image, name: 'filename', type: 'image/jpeg'});
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const resp = await upload(formData, userToken);
      console.log('upload response', resp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert(
            'Sorry, we need camera roll and camera permissions to make this work!'
          );
        }
      }
    })();
  }, []);

  const pickImage = async (library) => {
    let result = null;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    };
    if (library) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      result = await ImagePicker.launchCameraAsync(options);
    }

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ScrollView>
      <Text h4>Upload media file</Text>
      {image && (
        <Image
          source={{uri: image}}
          style={{width: '100%', height: undefined, aspectRatio: 1}}
        />
      )}
      <Input
        placeholder="title"
        value={inputs.title}
        onChangeText={(txt) => handleInputChange('title', txt)}
      />
      <Input
        placeholder="description"
        value={inputs.description}
        onChangeText={(txt) => handleInputChange('description', txt)}
      />
      <Button title="Choose from library" onPress={() => pickImage(true)} />
      <Button title="Use camera" onPress={() => pickImage(false)} />
      <Button title="Upload file" onPress={doUpload} />
    </ScrollView>
  );
};

export default Upload;
