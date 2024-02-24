import { CONFIG_RESTART } from '../constants/config';
import { ERROR_MESSAGE } from '../constants/message';

const restartValidator = {
  validate(restartInput) {
    if (!this.isValidInput(restartInput)) {
      throw new Error(ERROR_MESSAGE.RESTART);
    }
  },

  isValidInput(restart) {
    return restart === CONFIG_RESTART.YES || restart === CONFIG_RESTART.NO;
  },
};

export default restartValidator;
