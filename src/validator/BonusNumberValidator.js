import { LOTTO_SYMBOL } from '../constant/symbols';

const BonusNumberValidator = {
  isNumber(inputValue) {
    return !Number.isNaN(inputValue);
  },

  isValidRange(inputValue) {
    return inputValue >= LOTTO_SYMBOL.RANGE_MIN && inputValue <= LOTTO_SYMBOL.RANGE_MAX;
  },

  isUniqueBonusNumber(inputValue, winningNumbers) {
    return !winningNumbers.includes(inputValue);
  },
};

export default BonusNumberValidator;
