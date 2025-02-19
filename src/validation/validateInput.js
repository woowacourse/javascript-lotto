import { ERROR } from '../constants/errors.js';

export const hasEmptyString = (input) => {
  if (input === '') {
    throw new Error(ERROR.IS_VALUE_EMPTY);
  }
};

export const isValueInteger = (input) => {
  if (!Number.isInteger(input)) {
    throw new Error(ERROR.IS_NOT_POSITIVE_INTEGER);
  }
};
