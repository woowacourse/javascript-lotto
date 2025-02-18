import CustomError from "../CustomError.js";
import { hasNotInteger, isInRange, isMultipleOf } from "../utils/predicate.js";
import { ERROR_MESSAGE } from "../constants/message.js";
import { LOTTO_RULE } from "../constants/lotto.js";
import { isDuplicate } from "../utils/predicate.js";

export const validationLottoPrice = (price) => {
  if (!Number.isSafeInteger(price)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_INTEGER);
  }

  if (!isMultipleOf(price, LOTTO_RULE.MULTIPLE_PRICE)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_MULTIPLE_OF_THOUSAND);
  }

  if (price < LOTTO_RULE.MIN_PRICE) {
    throw new CustomError(ERROR_MESSAGE.INVALID_MIN_PRICE);
  }

  if (price > LOTTO_RULE.MAX_PRICE) {
    throw new CustomError(ERROR_MESSAGE.INVALID_OVER_MAX_PRICE);
  }
};

export const validationWinningNumbers = (winningNumbers) => {
  if (winningNumbers.length !== LOTTO_RULE.LOTTO_LENGTH) {
    throw new CustomError(ERROR_MESSAGE.INVALID_LOTTO_LENGTH);
  }

  if (isDuplicate(winningNumbers)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_DUPLICATE_NUMBER);
  }

  if (hasNotInteger(winningNumbers)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_INTEGER);
  }

  if (
    winningNumbers.some(
      (number) =>
        !isInRange(
          number,
          LOTTO_RULE.MIN_LOTTO_NUMBER,
          LOTTO_RULE.MAX_LOTTO_NUMBER
        )
    )
  ) {
    throw new CustomError(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
  }
};
