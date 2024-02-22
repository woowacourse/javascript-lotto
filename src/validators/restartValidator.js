import { ERROR_MESSAGE } from '../constants/message';

const restartValidator = {
  validate(restartInput) {
    const restart = restartInput.toLowerCase();
    if (!this.isValidInput(restart)) {
      throw new Error(ERROR_MESSAGE.RESTART);
    }
  },

  isValidInput(restart) {
    return restart === 'y' || restart === 'n';
  },
};

export default restartValidator;
