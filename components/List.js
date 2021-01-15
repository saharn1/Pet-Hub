import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';

const baseUrl = `http://media.mw.metropolia.fi/wbma/`;

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async (limit = 5) => {
    try {
      const listResponse = await fetch(baseUrl + 'media?limit=' + limit);
      const listJson = await listResponse.json();
      console.log('response json data', listJson);
      const media = await Promise.all(
        listJson.map(async (item) => {
          const fileResponse = await fetch(baseUrl + 'media/' + item.file_id);
          const fileJson = fileResponse.json();
          // console.log('media file data', json);
          return fileJson;
        })
      );
      console.log('media array data', media);

      setMediaArray(media);
    } catch (error) {
      console.error('loadMedia error', error);
    }
  };

  useEffect(() => {
    loadMedia(10);
  }, []);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()} // to gen key
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
