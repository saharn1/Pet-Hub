import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';

const url = `https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json`;

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log('response json data', json);
      setMediaArray(json);
    } catch (error) {
      console.error('loadMedia error', error);
    }
  };

  useEffect(() => {
    loadMedia();
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
