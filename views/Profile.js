import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Text, ListItem, Avatar} from 'react-native-elements';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/Variables';
import {ScrollView} from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const [filetype, setFiletype] = useState('');
  const {getFilesByTag} = useTag();

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    if (!isLoggedIn) {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarList = await getFilesByTag('_avatar' + user.user_id);
        if (avatarList.length > 0) {
          setAvatar(uploadsUrl + avatarList.pop().filename);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAvatar();
    getData();
  }, []);

  const setData = async (result) => {
    try {
      const jsonValue = JSON.stringify(result)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
      }
    } catch (e) {
      console.log('getting data error');
    }
  };

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
      setData(result);
    } else {
      result = await ImagePicker.launchCameraAsync(options);
      setData(result);
    }

    console.log(result);


    if (!result.cancelled) {
      setFiletype(result.type);
      setAvatar(result.uri);
    }


  };

  return (
    <ScrollView>
      <Card containerStyle={{backgroundColor: '#FFDCDC'}}>
        <Card.Title>
          <Text h1 style={{color: 'black'}}>
            {user.username}
          </Text>
        </Card.Title>
        <Card.Image
          onPress={() => pickImage(true)}
          buttonStyle={{backgroundColor: '#1ABBD1', size: 20, marginBottom: 20}}
          source={{uri: avatar}}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />

        <ListItem>
          <Avatar icon={{name: 'email', color: '#1ABBD1'}} />
          <Text>{user.email}</Text>
        </ListItem>
        <ListItem bottomDivider>
          <Avatar
            icon={{name: 'user', type: 'font-awesome', color: '#1ABBD1'}}
          />
          <Text>{user.full_name}</Text>
        </ListItem>
        <ListItem bottomDivider>
          <Avatar
            icon={{name: 'crow', type: 'font-awesome-5', color: '#1ABBD1'}}
          />
          <ListItem.Content>
            <ListItem.Title>My pet cart</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider onPress={() => navigation.push('My Files')}>
          <Avatar icon={{name: 'perm-media', color: '#1ABBD1'}} />
          <ListItem.Content>
            <ListItem.Title>My Files</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider onPress={logout}>
          <Avatar icon={{name: 'logout', color: '#1ABBD1'}} />
          <ListItem.Content>
            <ListItem.Title>Logout</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {width: '100%', height: undefined, aspectRatio: 1},
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
