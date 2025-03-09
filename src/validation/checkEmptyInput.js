import validationCondition from './validateCondition.js';

const checkEmptyInput = (input, errorMessage) => {
  if (validationCondition.isEmpty(input)) {
    throw new Error(errorMessage);
  }
};

export default checkEmptyInput;
