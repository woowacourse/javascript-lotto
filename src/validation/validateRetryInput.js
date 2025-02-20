import validationCondition from "./validateCondition.js";
import runValidators from "../util/runValidators.js";
import { RETRY_ERROR_MESSAGE } from "../constants/errorMessage.js";

const checkIsEmpty = (retryInput) => {
  if (validationCondition.isEmpty(retryInput)) {
    throw new Error(RETRY_ERROR_MESSAGE.EMPTY);
  }
};

const checkIsValidCharacter = (retryInput) => {
  if (!["y", "n"].includes(retryInput.toLowerCase())) {
    throw new Error(RETRY_ERROR_MESSAGE.INVALID);
  }
};

const validateRetryInput = (retryInput) => {
  runValidators([checkIsEmpty, checkIsValidCharacter], retryInput);
};

export default validateRetryInput;
