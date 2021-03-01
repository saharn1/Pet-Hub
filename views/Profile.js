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
  const [avatar, setAvatar] = useState([setImage]);
  const [filetype, setFiletype] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarList = await getFilesByTag('avatar_' + user.user_id);
        if (avatarList.length > 0) {
          setAvatar(uploadsUrl + avatarList.pop().filename);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAvatar();
  }, []);
  const {getFilesByTag} = useTag();
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    if (!isLoggedIn) {
      // this is to make sure isLoggedIn has changed, will be removed later
      navigation.navigate('Login');
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
    } else {
      result = await ImagePicker.launchCameraAsync(options);
    }

    console.log(result);

    if (!result.cancelled) {
      // console.log('pickImage result', result);
      setFiletype(result.type);
      setImage(result.uri);
    }
  };

  return (
    <ScrollView>
      <Card containerStyle={{backgroundColor: '#FFDCDC'}}>
        <Card.Title>
          <Text h1 style={{color: 'white'}}>
            {user.username}
          </Text>
        </Card.Title>
        <Card.Image
          title="Choose from library"
          onPress={() => pickImage(true)}
          buttonStyle={{backgroundColor: '#1ABBD1', size: 20, marginBottom: 20}}
          source={{uri: image}}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
        <ListItem>
          <Avatar icon={{name: 'email', color: '#1ABBD1'}} />
          <Text>{user.email}</Text>
        </ListItem>
        <ListItem>
          <Avatar
            icon={{name: 'user', type: 'font-awesome', color: '#1ABBD1'}}
          />
          <Text>{user.full_name}</Text>
        </ListItem>
        <ListItem bottomDivider onPress={() => navigation.push('My Likes')}>
          <Avatar
            icon={{name: 'heartbeat', type: 'font-awesome', color: '#1ABBD1'}}
          />
          <ListItem.Content>
            <ListItem.Title>My Likes</ListItem.Title>
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
