import {useState} from 'react';
import {validator} from '../utils/validator';
import {useUser} from './ApiHooks';

const constraints = {
  username: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 3,
      message: 'min length is 3 characters',
    },
  },
  password: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 5,
      message: 'min length is 5 characters',
    },
  },
  email: {
    presence: {
      message: 'cannot be empty',
    },
    email: {
      message: 'is not valid',
    },
  },
  full_name: {
    length: {
      minimum: 5,
      message: 'min length is 5 characters',
    },
  },
};

const useSignUpForm = (callback) => {
  const [usernameError, setUsernameError] = useState('');
  const [registerErrors, setRegisterErrors] = useState({});
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

  const handleInputEnd = (name, text) => {
    console.log('input end text', text);
    if (text === '') {
      text = null;
    }
    const error = validator(name, text, constraints);
    setRegisterErrors((registerErrors) => {
      return {
        ...registerErrors,
        [name]: error,
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
    handleInputEnd,
    inputs,
    usernameError,
    checkUserAvailable,
    registerErrors,
  };
};

export default useSignUpForm;
