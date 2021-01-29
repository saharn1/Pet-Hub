import {useState} from 'react';
import {useUser} from './ApiHooks';

const useSignUpForm = (callback) => {
  const [usernameError, setUsernameError] = useState('');
  const {checkIsUserAvailable} = useUser();

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });

  const handleInputChange = (name, text) => {
    // console.log(name, text);
    // console.log('inputs state', inputs);
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const checkUserAvailable = async (event) => {
    // console.log('username input', event.nativeEvent.text);
    try {
      const result = await checkIsUserAvailable(event.nativeEvent.text);
      if (!result) {
        setUsernameError('Username already exists');
      } else {
        setUsernameError('');
      }
    } catch (error) {
      console.error('reg checkUserAvailable', error);
    }
  };

  return {
    handleInputChange,
    inputs,
    usernameError,
    checkUserAvailable,
  };
};

export default useSignUpForm;
