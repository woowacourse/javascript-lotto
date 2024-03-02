import { ERROR_MESSAGE } from '../../constants/message';
import { renderError } from '../../util/view';

export const checkInputEmpty = (inputs, ele) => {
  try {
    inputs.some((input) => {
      if (!input.value.length) {
        throw new Error(`${ERROR_MESSAGE.PREFIX} ${ERROR_MESSAGE.SOME_INPUT_EMPTY}`);
      }
    });
  } catch ({ message }) {
    renderError(ele, message);
  }
};
