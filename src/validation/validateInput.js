import { ERROR } from './errorMessages.js';

export const hasEmptyString = (input) => input === '';

export const isValueInteger = (input) => Number.isInteger(input);

export const validateRestart = (input) => {
  if (input !== 'y' && input !== 'n') {
    throw new Error(ERROR.CHECK_REPLAY_GAME);
  }
};
