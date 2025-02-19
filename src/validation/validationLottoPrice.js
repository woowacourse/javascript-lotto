import CustomError from "../CustomError.js";
import { LOTTO_RULE } from "../constants/lotto.js";
import { ERROR_MESSAGE } from "../constants/message.js";
import { isMultipleOf } from "../utils/predicate.js";

const validationLottoPrice = (price) => {
  if (!Number.isSafeInteger(price)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_INTEGER);
  }

  if (price < LOTTO_RULE.MIN_PRICE) {
    throw new CustomError(ERROR_MESSAGE.INVALID_MIN_PRICE);
  }

  if (!isMultipleOf(price, LOTTO_RULE.MULTIPLE_PRICE)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_MULTIPLE_OF_THOUSAND);
  }

  if (price > LOTTO_RULE.MAX_PRICE) {
    throw new CustomError(ERROR_MESSAGE.INVALID_OVER_MAX_PRICE);
  }
};

export default validationLottoPrice;
