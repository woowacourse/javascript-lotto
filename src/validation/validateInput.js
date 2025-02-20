import { ERROR } from '../constants/errors.js';

export const hasEmptyString = (input) => {
  if (input === '') {
    throw new Error(ERROR.VALUE_EMPTY);
  }
};

export const isValueInteger = (input) => {
  if (!Number.isInteger(input)) {
    throw new Error(ERROR.NOT_POSITIVE_INTEGER);
  }
};

export const isYesOrNo = (input) => {
  if (input !== 'y' && input !== 'n') {
    throw new Error(ERROR.CHECK_REPLAY_GAME);
  }
};
