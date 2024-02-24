import ERROR_MESSAGE from "../constants/error-messages.js";
import { LOTTO_NUMBER_RANGE } from "../constants/lotto-constants.js";
import AppError from "../utils/Error.js";

const bonusNumberValidator = {
  validateDuplication({ winningLottoNumbers, bonusNumber }) {
    if (winningLottoNumbers.includes(bonusNumber)) {
      throw new AppError(ERROR_MESSAGE.INVALID_BONUS_NUMBER_DUPLICATE);
    }
  },

  validateRange(bonusNumber) {
    if (
      bonusNumber < LOTTO_NUMBER_RANGE.MIN ||
      bonusNumber > LOTTO_NUMBER_RANGE.MAX
    ) {
      throw new AppError(ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
    }
  },

  validateIsNumber(bonusNumber) {
    if (!Number.isInteger(bonusNumber)) {
      throw new AppError(ERROR_MESSAGE.INVALID_BONUS_NUMBER_TYPE);
    }
  },

  validate({ winningLottoNumbers, bonusNumber }) {
    const formatedBonusNumber = Number(bonusNumber);
    this.validateIsNumber(formatedBonusNumber);
    this.validateRange(formatedBonusNumber);
    this.validateDuplication({ winningLottoNumbers, bonusNumber });
  },
};

export default bonusNumberValidator;
