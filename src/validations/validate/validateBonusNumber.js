import { BONUS_NUMBER_ERROR_MESSAGES } from '../../constants/constants.js';
import runValidators from '../../utils/runValidators.js';
import { numberUtils } from '../utils/numberUtils.js';

const bonusNumberValidator = {
  isDuplicated(winningNumbers, bonusNumber) {
    return winningNumbers.hasNumber(bonusNumber);
  },
};

const validateInteger = (winningNumbers, bonusNumber) => {
  if (!numberUtils.isInteger(bonusNumber)) {
    throw new Error(BONUS_NUMBER_ERROR_MESSAGES.INTIGER);
  }
};

const validateRange = (winningNumbers, bonusNumber) => {
  if (!numberUtils.isLottoRange(bonusNumber)) {
    throw new Error(BONUS_NUMBER_ERROR_MESSAGES.RANGE);
  }
};

const validateDuplicate = (winningNumbers, bonusNumber) => {
  if (bonusNumberValidator.isDuplicated(winningNumbers, bonusNumber)) {
    throw new Error(BONUS_NUMBER_ERROR_MESSAGES.DUPLICATE);
  }
};

const validateBonusNumber = (winningNumbers, bonusNumber) =>
  runValidators([validateInteger, validateRange, validateDuplicate], winningNumbers, bonusNumber);

export default validateBonusNumber;
