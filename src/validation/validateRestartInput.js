import CustomError from "../CustomError.js";
import { LOTTO_RESTART_COMMAND } from "../constants/lotto.js";
import { ERROR_MESSAGE, ERROR_PREFIX } from "../constants/message.js";

const validateRestartInput = (userInput) => {
  const commandList = Object.values(LOTTO_RESTART_COMMAND);
  if (!commandList.includes(userInput)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_RESTART, ERROR_PREFIX.invalidInputError);
  }
};

export default validateRestartInput;
