import { LOTTO_NUMBER } from "../constants/lotto.js";
import { ERROR } from "../constants/message.js";
import { throwError } from "../utils/throwError.js";
import { validateEmpty, validateNumber, validateRange } from "./validate.js";

const validateLotto = (lotto) => {
  lotto.forEach((number) => {
    validateEmpty(number);
    validateNumber(number);
    validateRange({ min: LOTTO_NUMBER.MIN, max: LOTTO_NUMBER.MAX }, number);
  });
  validateDuplicate(lotto);
  checkLength(lotto);
};

const validateDuplicate = (arr) => {
  if (new Set(arr).size !== arr.length) {
    throwError(ERROR.DUPLICATE);
  }
};

const checkLength = (arr) => {
  if (arr.length !== LOTTO_NUMBER.LENGTH) {
    throwError(ERROR.LENGTH);
  }
};

export default validateLotto;
