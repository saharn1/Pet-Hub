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

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCredentials),
    };
    try {
      const response = await fetch(baseUrl + 'login', options);
      const userData = await response.json();
      console.log('postLogin response status', response.status);
      console.log('postLogin userData', userData);
      if (response.ok) {
        return userData;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const checkToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const response = await fetch(baseUrl + 'users/user', options);
      const userData = response.json();
      if (response.ok) {
        return userData;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {postLogin, checkToken};
};

export {useLoadMedia, useLogin};
