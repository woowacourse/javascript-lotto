import messages from '../constants/messages';
import ValidatorUtils from './ValidatorUtils';

const InputValidator = {
  validateWithCondition(condition, errorMessage) {
    if (!condition) {
      throw new Error(errorMessage);
    }
  },

  validateMoneyInput(number) {
    this.validateWithCondition(ValidatorUtils.isPositiveInteger(+number), messages.ERROR.POSITIVE_INTEGER);
    this.validateWithCondition(ValidatorUtils.isThousandsOfWon(+number), messages.ERROR.THOUSANDS_WON);
  },

  validateWinningNumberInput(winningNumber) {
    winningNumber.split(',').forEach(number => {
      this.validateWithCondition(ValidatorUtils.isPositiveInteger(+number), messages.ERROR.VALID_SIX_NUMBER);
      this.validateWithCondition(ValidatorUtils.isInRange(+number), messages.ERROR.VALID_SIX_NUMBER);
    });

    this.validateWithCondition(ValidatorUtils.hasNoBlank(winningNumber.split('')), messages.ERROR.HAS_BLANK);
  },

  validateBonusNumber(number) {
    this.validateWithCondition(ValidatorUtils.isPositiveInteger(+number), messages.ERROR.POSITIVE_INTEGER);
    this.validateWithCondition(ValidatorUtils.isInRange(+number), messages.ERROR.IN_RANGE);
  }
};

export default InputValidator;
