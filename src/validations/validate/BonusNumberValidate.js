import { BonusNumberValidator } from '../validator/BonusNumberValidator.js';
import { BONUS_NUMBER_ERROR_MESSAGES } from '../../constants/constants.js';
import runValidators from '../../utils/runValidators.js';

const $lottoFormError = document.getElementById('lotto-form__error');

const validateInteger = (winningNumbers, bonusNumber) => {
  if (!BonusNumberValidator.isInteger(bonusNumber)) {
    $lottoFormError.textContent = BONUS_NUMBER_ERROR_MESSAGES.INTIGER;
    throw new Error(BONUS_NUMBER_ERROR_MESSAGES.INTIGER);
  }
};

const validateRange = (winningNumbers, bonusNumber) => {
  if (!BonusNumberValidator.isValidRange(bonusNumber)) {
    $lottoFormError.textContent = BONUS_NUMBER_ERROR_MESSAGES.RANGE;
    throw new Error(BONUS_NUMBER_ERROR_MESSAGES.RANGE);
  }
};

const validateDuplicate = (winningNumbers, bonusNumber) => {
  if (BonusNumberValidator.isDuplicated(winningNumbers, bonusNumber)) {
    $lottoFormError.textContent = BONUS_NUMBER_ERROR_MESSAGES.DUPLICATE;
    throw new Error(BONUS_NUMBER_ERROR_MESSAGES.DUPLICATE);
  }
};

const validateBonusNumber = (winningNumbers, bonusNumber) =>
  runValidators([validateInteger, validateRange, validateDuplicate], winningNumbers, bonusNumber);

export default validateBonusNumber;
