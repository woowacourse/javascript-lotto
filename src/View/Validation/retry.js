import { RETRY_MESSAGE } from '../Constant/errorMessage.js';

const isYorN = (input) => {
  return input === 'y' || input === 'n';
};

export const validateYorN = (input) => {
  if (isYorN(input) === false) {
    throw new Error(RETRY_MESSAGE);
  }
};
