import { ERROR, RANDOM } from '../constants';

const BonusNumberValidator = {
  validate(inputValue, winningNumber) {
    this.validateInteger(inputValue);
    this.validateRange(inputValue);
    this.validateDuplicatedWinningNumber(inputValue, winningNumber);
  },

  validateInteger(inputValue) {
    if (!Number.isInteger(inputValue)) throw new Error(ERROR.INVALID_NUMBER_FORMAT);
  },

  validateRange(inputValue) {
    if (!(inputValue >= RANDOM.MIN && inputValue <= RANDOM.MAX))
      throw new Error(ERROR.BONUS_NUMBER_IS_OUT_OF_RANGE);
  },

  validateDuplicatedWinningNumber(inputValue, winningNumber) {
    if (winningNumber.includes(inputValue)) throw new Error(ERROR.DUPLICATE_WINNING_NUMBER);
  },
};

export default BonusNumberValidator;
