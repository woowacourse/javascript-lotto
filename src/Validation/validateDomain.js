import {
  isValidPurchaseAmountUnit,
  isValidPurchaseAmountRange,
  hasValidLength,
  hasNoDuplicate,
  isInValidRange,
  hasNoDuplicateBonusNumber,
} from './validations.js';

import {
  LOTTO_PURCHASE_AMOUNT,
  LOTTO_WINNING_NUMBERS,
  LOTTO_BONUS_NUMBER,
} from '../View/Constant/errorMessage.js';

export const validatePurchaseAmount = (amount) => {
  if (!isValidPurchaseAmountUnit(amount)) {
    throw new Error(LOTTO_PURCHASE_AMOUNT.INVALID_PURCHASE_UNIT);
  }
  if (!isValidPurchaseAmountRange(amount)) {
    throw new Error(LOTTO_PURCHASE_AMOUNT.INVALID_PURCHASE_RANGE);
  }
};

export const validateLottoNumbers = (numbers) => {
  if (!hasValidLength(numbers)) {
    throw new Error(LOTTO_WINNING_NUMBERS.INVALID_LOTTO_COUNT);
  }
  if (!hasNoDuplicate(numbers)) {
    throw new Error(LOTTO_WINNING_NUMBERS.DUPLICATE_LOTTO_NUMBERS);
  }
  if (!numbers.every(isInValidRange)) {
    throw new Error(LOTTO_WINNING_NUMBERS.INVALID_LOTTO_RANGE);
  }
};

export const validateBonusNumber = (bonusNumber, winningNumbers) => {
  if (!isInValidRange(bonusNumber)) {
    throw new Error(LOTTO_BONUS_NUMBER.INVALID_BONUS_RANGE);
  }
  if (!hasNoDuplicateBonusNumber(bonusNumber, winningNumbers)) {
    throw new Error(LOTTO_BONUS_NUMBER.DUPLICATE_BONUS_NUMBER);
  }
};
