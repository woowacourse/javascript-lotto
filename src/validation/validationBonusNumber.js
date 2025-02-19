import CustomError from "../CustomError.js";
import { ERROR_MESSAGE } from "../constants/message.js";
import { LOTTO_RULE } from "../constants/lotto.js";
import { isInRange, isDuplicate } from "../utils/predicate.js";

const validationBonusNumber = (bonusNumber, winningNumbers) => {
  if (!Number.isSafeInteger(bonusNumber)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_INTEGER);
  }

  if (
    !isInRange(
      bonusNumber,
      LOTTO_RULE.MIN_LOTTO_NUMBER,
      LOTTO_RULE.MAX_LOTTO_NUMBER
    )
  ) {
    throw new CustomError(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
  }

  if (isDuplicate([bonusNumber, ...winningNumbers])) {
    throw new CustomError(ERROR_MESSAGE.INVALID_DUPLICATE_BONUS_NUMBER);
  }
};

export default validationBonusNumber;
