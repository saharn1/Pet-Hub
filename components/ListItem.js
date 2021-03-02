import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/Variables';
import {Avatar, Icon, ListItem as RNEListItem} from 'react-native-elements';
import {Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia, useFavorite} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {Alert, TouchableOpacity} from 'react-native';
import {View} from 'react-native';

const ListItem = ({navigation, singleMedia, isMyFile}) => {
  // console.log(props);
  const {deleteFile} = useMedia();
  const {likeAnImage} = useFavorite();
  const {setUpdate, update} = useContext(MainContext);
  const [like, setLike] = useState(true);

  const doLike = async () => {
    setLike(!like);
    if (like) {
      Alert.alert('Message', 'You liked this pet!');
    }
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const resp = await likeAnImage(flle_id,userToken);
      console.log('posting user like', resp);

    } catch (error) {
      console.log('error');
    }


  };

  const doDelete = () => {
    Alert.alert(
      'Delete',
      'this file permanently?',
      [
        {text: 'Cancel'},
        {
          title: 'Ok',
          onPress: async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            try {
              await deleteFile(singleMedia.file_id, userToken);
              setUpdate(update + 1);
            } catch (error) {
              // notify user here?
              console.error(error);
            }
          },
        },
      ],
      {cancelable: false}
    );
  };

  return (
    <RNEListItem
      containerStyle={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,

        elevation: 13,
      }}
      bottomDivider
      onPress={() => {
        navigation.navigate('Single', {file: singleMedia});
      }}
    >
      <View>
        <Avatar
          size="xlarge"
          rounded
          containerStyle={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.39,
            shadowRadius: 5.3,
            elevation: 13,
          }}
          source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
        ></Avatar>

        <View style={{flexDirection: 'row', alignContent: 'center'}}>
          <TouchableOpacity onPress={ doLike}>
            <Icon
              raised
              name={like ? 'thumbs-up' : 'thumbs-up'}
              size={20}
              type="font-awesome-5"
              color={like ? 'grey' : 'red'}
            />
          </TouchableOpacity>
          <Icon
            raised
            name="plus"
            type="font-awesome"
            color="grey"
            size={20}
            onPress={() => {
              navigation.navigate('Picture', {file: singleMedia});
            }}
            containerStyle={{marginLeft: 45}}
          />
        </View>
      </View>
      <RNEListItem.Content>
        <RNEListItem.Title h2 style={{alignSelf: 'center'}}>
          {singleMedia.title}
        </RNEListItem.Title>

        <RNEListItem.Subtitle
          style={{
            alignSelf: 'center',
            fontSize: 16,
            marginTop: 10,
            color: 'grey',
          }}
        >
          {singleMedia.description}
        </RNEListItem.Subtitle>

        {isMyFile && (
          <>
            <View style={{flexDirection: 'row', marginTop: 100}}>
              <View style={{marginRight: 20}}>
                <Button
                  title="Modify"
                  onPress={() => navigation.push('Modify', {file: singleMedia})}
                  color="#1ABBD1"
                ></Button>
              </View>
              <View>
                <Button title="Delete" color="red" onPress={doDelete}></Button>
              </View>
            </View>
          </>
        )}
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  isMyFile: PropTypes.bool,
};

export default ListItem;
