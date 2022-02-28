import {
  NOT_NUMBER_TYPE_ERROR,
  NOT_POSITIVE_NUMBER_ERROR,
} from '../constants/errorMessage.js';

export const isValueTypeNumber = value => {
  if (Number.isInteger(value)) {
    return true;
  }
  throw new Error(NOT_NUMBER_TYPE_ERROR);
};

export const isPositiveNumber = value => {
  if (value > 0) {
    return true;
  }
  throw new Error(NOT_POSITIVE_NUMBER_ERROR);
};
