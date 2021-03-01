import {useState} from 'react';
import {validator} from '../utils/validator';

const constraints = {
  pet_name: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 3,
      message: 'min length is 3 characters',
    },
  },
  pet_type: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 3,
      message: `Enter: Cat or Dog or Other`,
    },
  },
  pet_age: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 1,
      message: 'min length is 1 number',
    },
  },
  pet_health: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 10,
      message: 'Vaccinated or Not Vaccinated',
    },
  },
  pet_description: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 5,
      message: 'Short description of the pet you want to addopt.',
    },
  },
};

const useUploadForm = (callback) => {
  const [inputs, setInputs] = useState({
    pet_name: '',
    pet_type: '',
    pet_age: '',
    pet_health: '',
    pet_description: '',
  });
  const [uploadErrors, setUploadErrors] = useState({});

  const handleInputChange = (name, text) => {
    // console.log(name, text);
    // console.log('inputs state', inputs);
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
    const error = validator(name, text, constraints);
    setUploadErrors((uploadErrors) => {
      return {
        ...uploadErrors,
        [name]: error,
      };
    });
  };

  const reset = () => {
    setInputs({
      pet_name: '',
      pet_type: '',
      pet_age: '',
      pet_health: '',
      pet_description: '',
    });
    setUploadErrors({});
  };

  return {
    handleInputChange,
    inputs,
    setInputs,
    uploadErrors,
    reset,
  };
};

export default useUploadForm;
