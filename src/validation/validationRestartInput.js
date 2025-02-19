import CustomError from "../CustomError.js";
import { ERROR_MESSAGE } from "../constants/message.js";

const validationRestartInput = (userInput) => {
  if (userInput !== "Y" && userInput !== "N") {
    throw new CustomError(ERROR_MESSAGE.INVALID_RESTART);
  }
};

export default validationRestartInput;
