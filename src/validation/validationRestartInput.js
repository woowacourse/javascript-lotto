import CustomError from "../CustomError.js";
import { LOTTO_RESTART_COMMAND } from "../constants/lotto.js";
import { ERROR_MESSAGE } from "../constants/message.js";

const validationRestartInput = (userInput) => {
  const commandList = Object.values(LOTTO_RESTART_COMMAND);
  if (!commandList.includes(userInput)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_RESTART);
  }
};

export default validationRestartInput;
