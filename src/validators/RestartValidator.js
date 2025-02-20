import { RESTART } from '../constants/CONFIGURATIONS.js';
import { ERROR_MESSAGE } from '../constants/MESSAGES.js';

const RestartValidator = {
  validate: (input) => {
    if (
      !input ||
      (input.toLowerCase() !== RESTART.YES &&
        input.toLowerCase() !== RESTART.NO)
    ) {
      throw new Error(ERROR_MESSAGE.RESTART.INVALID_INPUT);
    }
  },
};

export default RestartValidator;
