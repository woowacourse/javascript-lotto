import runValidators from '../util/runValidators.js';
import { RETRY_ERROR_MESSAGE } from '../constants/errorMessage.js';
import checkEmptyInput from './checkEmptyInput.js';

const checkEmpty = (retryInput) => checkEmptyInput(retryInput, RETRY_ERROR_MESSAGE.EMPTY);

const checkIsValidCharacter = (retryInput) => {
  if (!['y', 'n'].includes(retryInput.toLowerCase())) {
    throw new Error(RETRY_ERROR_MESSAGE.INVALID);
  }
};

const validateRetryInput = (retryInput) => {
  runValidators([checkEmpty, checkIsValidCharacter], retryInput);
};

export default validateRetryInput;
