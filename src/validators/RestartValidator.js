<<<<<<< HEAD
import { RESTART } from '../constants/Configurations.js';
import { ERROR_MESSAGE } from '../constants/Messages.js';
=======
import { RESTART } from '../constants/CONFIGURATIONS.js';
import { ERROR_MESSAGE } from '../constants/MESSAGES.js';
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693

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
