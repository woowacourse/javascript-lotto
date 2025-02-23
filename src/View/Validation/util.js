import { COMMON_ERROR_MESSAGE } from '../Constant/errorMessage.js';

export const hasEmptySpace = (input) => {
  return input.includes(' ') || input.trim() === '';
};

export const isInteger = (input) => {
  return Number.isInteger(input);
};

export const hasEmptySpaceInArray = (input) => {
  return input.some((input) => hasEmptySpace(input));
};

export const validateInteger = (input) => {
  if (isInteger(input) === false) {
    throw new Error(`${COMMON_ERROR_MESSAGE.NOT_INTEGER}`);
  }
};

export const validateEmptySpace = (input) => {
  if (hasEmptySpace(input)) {
    throw new Error(`${COMMON_ERROR_MESSAGE.NO_EMPTY_SPACE}`);
  }
};
