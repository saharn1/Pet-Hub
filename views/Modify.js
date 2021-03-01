import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {Input, Text, Image, Button, Card} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const Modify = ({navigation, route}) => {
  const {file} = route.params;
  const [isUploading, setIsUploading] = useState(false);
  const {updateFile} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const {
    handleInputChange,
    inputs,
    setInputs,
    uploadErrors,
    reset,
  } = useUploadForm();

  const doUpdate = async () => {
    try {
      setIsUploading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      const resp = await updateFile(file.file_id, inputs, userToken);
      console.log('update response', resp);
      setUpdate(update + 1);
      navigation.pop();
    } catch (error) {
      Alert.alert('Update', 'Failed');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    setInputs({
      pet_name: file.pet_name,
      pet_type: file.pet_type,
      pet_age: file.pet_age,
      pet_health: file.pet_health,
      pet_description: file.pet_description,
    });
  }, []);

  const doReset = () => {
    reset();
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" enabled>
        <Card>
          <Text h4>Update file info</Text>
          {/* TODO: add similar media view than Single.js */}
          <Input
            placeholder="pet_name"
            value={inputs.pet_name}
            onChangeText={(txt) => handleInputChange('pet_name', txt)}
            errorMessage={uploadErrors.pet_name}
          />
          <Input
            placeholder="pet_type"
            value={inputs.pet_type}
            onChangeText={(txt) => handleInputChange('pet_type', txt)}
            errorMessage={uploadErrors.pet_type}
          />
          <Input
            placeholder="pet_age"
            value={inputs.pet_age}
            onChangeText={(txt) => handleInputChange('pet_age', txt)}
            errorMessage={uploadErrors.pet_age}
          />
          <Input
            placeholder="pet_health"
            value={inputs.pet_health}
            onChangeText={(txt) => handleInputChange('pet_health', txt)}
            errorMessage={uploadErrors.pet_health}
          />
          <Input
            placeholder="pet_description"
            value={inputs.pet_description}
            onChangeText={(txt) => handleInputChange('pet_description', txt)}
            errorMessage={uploadErrors.pet_description}
          />
          {isUploading && <ActivityIndicator size="large" color="#0000ff" />}
          <Button
            title="Update"
            onPress={doUpdate}
            // disabled={
            //   uploadErrors.title !== null || uploadErrors.description !== null
            // }
          />
          <Button title="Reset" onPress={doReset} />
        </Card>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

Modify.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Modify;
