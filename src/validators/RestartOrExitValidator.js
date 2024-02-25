import { ERROR } from '../constants';

const RestartOrExitValidator = {
  validateKeyword(inputValue) {
    if (!this.isValidKeyword(inputValue)) throw new Error(ERROR.RESTART_OR_EXIT);
  },

  isValidKeyword(inputValue) {
    return inputValue === 'y' || inputValue === 'n';
  },
};

export default RestartOrExitValidator;
