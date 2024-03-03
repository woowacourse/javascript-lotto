import { ERROR_MESSAGE } from '../../constants/message';

export const checkInputEmpty = (inputs) => {
  inputs.some((input) => {
    if (!input.value.length) {
      throw new Error(`${ERROR_MESSAGE.PREFIX} ${ERROR_MESSAGE.SOME_INPUT_EMPTY}`);
    }
  });
};
