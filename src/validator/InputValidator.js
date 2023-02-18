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
    const splitWinningNumber = winningNumber.split(',');
    
    splitWinningNumber.forEach(number => {
      this.validateWithCondition(ValidatorUtils.isPositiveInteger(+number), messages.ERROR.VALID_SIX_NUMBER);
      this.validateWithCondition(ValidatorUtils.isInRange(+number), messages.ERROR.VALID_SIX_NUMBER);
    });

    this.validateWithCondition(ValidatorUtils.hasNoBlank(winningNumber.split('')), messages.ERROR.HAS_BLANK);
    this.validateWithCondition(ValidatorUtils.isSixLength(splitWinningNumber), messages.ERROR.NOT_SIX_LENGTH);
    this.validateWithCondition(ValidatorUtils.isNotOverlap(splitWinningNumber), messages.ERROR.OVERLAP);
  },

  validateBonusNumberInput(number) {
    this.validateWithCondition(ValidatorUtils.isPositiveInteger(+number), messages.ERROR.POSITIVE_INTEGER);
    this.validateWithCondition(ValidatorUtils.isInRange(+number), messages.ERROR.IN_RANGE);
  },

  validateRestart(restartOrNot) {
    this.validateWithCondition(ValidatorUtils.isYorN(restartOrNot), messages.ERROR.Y_OR_N);
  },
};

export default InputValidator;
