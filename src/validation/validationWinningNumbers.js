import { LOTTO_RULE } from "../constants/lotto.js";
import { ERROR_MESSAGE } from "../constants/message.js";
import CustomError from "../CustomError.js";
import { isInRange, isDuplicate, hasNotInteger } from "../utils/predicate.js";

const validationWinningNumbers = (winningNumbers) => {
  if (winningNumbers.length !== LOTTO_RULE.LOTTO_LENGTH) {
    throw new CustomError(ERROR_MESSAGE.INVALID_LOTTO_LENGTH);
  }

  if (isDuplicate(winningNumbers)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_DUPLICATE_NUMBER);
  }

  if (hasNotInteger(winningNumbers)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_INTEGER);
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
    throw new CustomError(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
  }
};

export default validationWinningNumbers;
