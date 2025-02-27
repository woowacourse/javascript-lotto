import { RESTART } from '../constants/Configurations.js';
import { ERROR_MESSAGE } from '../constants/Messages.js';

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
