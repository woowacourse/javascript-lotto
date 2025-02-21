import { LOTTO_RULE } from "../constants/lotto.js";
import { ERROR_MESSAGE, ERROR_PREFIX } from "../constants/message.js";
import CustomError from "../CustomError.js";
import { isInRange, isDuplicate, hasNotInteger } from "../utils/predicate.js";

const validateWinningNumbers = (winningNumbers) => {
  if (winningNumbers.length !== LOTTO_RULE.LOTTO_LENGTH) {
    throw new CustomError(ERROR_MESSAGE.INVALID_LOTTO_LENGTH, ERROR_PREFIX.lengthError);
  }

  if (isDuplicate(winningNumbers)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_DUPLICATE_NUMBER, ERROR_PREFIX.duplicateError);
  }

  if (hasNotInteger(winningNumbers)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_INTEGER, ERROR_PREFIX.typeError);
  }

  const isInvalidLottoNumberRange = winningNumbers.some(
    (number) =>
      !isInRange(
        number,
        LOTTO_RULE.MIN_LOTTO_NUMBER,
        LOTTO_RULE.MAX_LOTTO_NUMBER
      )
  );
  if (isInvalidLottoNumberRange) {
    throw new CustomError(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE, ERROR_PREFIX.rangeError);
  }
};

export default validateWinningNumbers;
