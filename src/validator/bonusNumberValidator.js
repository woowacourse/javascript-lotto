import ERROR_MESSAGE from '../constants/error-messages.js';
import { LOTTO_NUMBER_RANGE } from '../constants/lotto-constants.js';
import AppError from '../utils/appError.js';

const bonusNumberValidator = {
  validateDuplication({ winningLottoNumbers, bonusNumber }) {
    if (winningLottoNumbers.includes(bonusNumber)) {
      throw new AppError(ERROR_MESSAGE.INVALID_BONUS_NUMBER_DUPLICATE);
    }
  },

  validateRange(bonusNumber) {
    if (bonusNumber < LOTTO_NUMBER_RANGE.MIN || bonusNumber > LOTTO_NUMBER_RANGE.MAX) {
      throw new AppError(ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
    }
  },

  validateIsNumber(bonusNumber) {
    if (!Number.isInteger(bonusNumber)) {
      throw new AppError(ERROR_MESSAGE.INVALID_BONUS_NUMBER_TYPE);
    }
  },

  validate({ winningLottoNumbers, bonusNumber }) {
    const formattedBonusNumber = Number(bonusNumber);
    this.validateIsNumber(formattedBonusNumber);
    this.validateRange(formattedBonusNumber);
    this.validateDuplication({
      winningLottoNumbers,
      bonusNumber: formattedBonusNumber,
    });
  },
};

export default bonusNumberValidator;
