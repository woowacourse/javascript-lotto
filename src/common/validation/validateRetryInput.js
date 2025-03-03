import validationCondition from "./validateCondition.js";
import runValidators from "../util/runValidators.js";
import { RETRY_ERROR_MESSAGE } from "../lottoConstants/errorMessage.js";
import { RETRY_ANSWER } from "../lottoConstants/systemConstants.js";

const checkIsEmpty = (retryInput) => {
  if (validationCondition.isEmpty(retryInput)) {
    throw new Error(RETRY_ERROR_MESSAGE.EMPTY);
  }
};

const checkIsValidCharacter = (retryInput) => {
  if (![RETRY_ANSWER.YES, RETRY_ANSWER.NO].includes(retryInput.toLowerCase())) {
    throw new Error(RETRY_ERROR_MESSAGE.INVALID);
  }
};

const validateRetryInput = (retryInput) => {
  runValidators([checkIsEmpty, checkIsValidCharacter], retryInput);
};

export default validateRetryInput;
