import { RESTART } from "../constants/CONFIGURATIONS";
import { ERROR_MESSAGE } from "../constants/MESSAGES";

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

export { RestartValidator };
