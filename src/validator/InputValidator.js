import messages from '../constants/messages';
import ValidatorUtils from './ValidatorUtils';

const inputValidator = {
  validateWithCondition(conditions) {
    conditions.forEach(condition => {
      if (!condition.condition) {
        throw new Error(condition.errorMessage);
      }
    });
  },

  validateMoneyInput(number) {
    this.validateWithCondition([
      { condition: ValidatorUtils.isPositiveInteger(+number), errorMessage: messages.ERROR.POSITIVE_INTEGER },
      { condition: ValidatorUtils.isThousandsOfWon(+number), errorMessage: messages.ERROR.THOUSANDS_WON },
    ]);
  },

  validateWinningNumberInput(winningNumber) {
    const winningNumberSplit = winningNumber.split(',');

    winningNumberSplit.forEach(number => {
      this.validateWithCondition([
        {
          condition: ValidatorUtils.isPositiveInteger(+number),
          errorMessage: messages.ERROR.VALID_SIX_NUMBER,
        },
        {
          condition: ValidatorUtils.isInRange(+number),
          errorMessage: messages.ERROR.VALID_SIX_NUMBER,
        },
      ]);
    });

    this.validateWithCondition([
      { condition: ValidatorUtils.hasNoBlank(winningNumberSplit), errorMessage: messages.ERROR.HAS_BLANK },
    ]);
  },

  validateBonusNumberInput(number) {
    this.validateWithCondition([
      { condition: ValidatorUtils.isPositiveInteger(+number), errorMessage: messages.ERROR.POSITIVE_INTEGER },
      { condition: ValidatorUtils.isInRange(+number), errorMessage: messages.ERROR.IN_RANGE },
    ]);
  },
};

export default inputValidator;
