import CustomError from "../CustomError.js";
import { LOTTO_RULE } from "../constants/lotto.js";
import { ERROR_MESSAGE, ERROR_PREFIX } from "../constants/message.js";
import { isInRange, isMultipleOf } from "../utils/predicate.js";

const validateLottoPrice = (price) => {
  if (!Number.isSafeInteger(price)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_INTEGER, ERROR_PREFIX.typeError);
  }

  if (!isInRange(price, LOTTO_RULE.MIN_PRICE)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_MIN_PRICE, ERROR_PREFIX.rangeError);
  }

  if (!isMultipleOf(price, LOTTO_RULE.MULTIPLE_PRICE)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_MULTIPLE_OF_THOUSAND, ERROR_PREFIX.invalidInputError);
  }

  if (!isInRange(price, null, LOTTO_RULE.MAX_PRICE)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_OVER_MAX_PRICE, ERROR_PREFIX.rangeError);
  }
};

export default validateLottoPrice;
