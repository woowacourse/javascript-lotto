import { CONFIG, ERROR_MESSAGE } from '../constants';

const restartValidator = {
  validate(restartInput) {
    if (!this.isValidInput(restartInput)) {
      throw new Error(ERROR_MESSAGE.RESTART);
    }
  },

  isValidInput(restart) {
    return restart === CONFIG.RESTART_YES || restart === CONFIG.RESTART_NO;
  },
};

export default restartValidator;
