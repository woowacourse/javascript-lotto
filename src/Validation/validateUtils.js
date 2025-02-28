import { hasEmptySpace, isInteger } from './validations.js';

import { COMMON_ERROR_MESSAGE } from '../View/Constant/errorMessage.js';

export const validateEmptySpace = (input) => {
  if (hasEmptySpace(input)) {
    throw new Error(COMMON_ERROR_MESSAGE.NO_EMPTY_SPACE);
  }
};

export const validateInteger = (input) => {
  if (!isInteger(input)) {
    throw new Error(COMMON_ERROR_MESSAGE.NOT_INTEGER);
  }
};
