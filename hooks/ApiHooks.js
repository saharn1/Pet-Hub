import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/Variables';

const useLoadMedia = () => {
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
  return mediaArray;
};

export {useLoadMedia};
