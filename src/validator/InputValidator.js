import messages from '../constants/messages';
import validatorUtils from './ValidatorUtils';

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
      { condition: validatorUtils.isPositiveInteger(+number), errorMessage: messages.ERROR.POSITIVE_INTEGER },
      { condition: validatorUtils.isThousandsOfWon(+number), errorMessage: messages.ERROR.THOUSANDS_WON },
    ]);
  },

  validateWinningNumberInput(winningNumber) {
    const winningNumberSplit = winningNumber.split(',');

    winningNumberSplit.forEach(number => {
      this.validateWithCondition([
        {
          condition: validatorUtils.isPositiveInteger(+number),
          errorMessage: messages.ERROR.VALID_SIX_NUMBER,
        },
        {
          condition: validatorUtils.isInRange(+number),
          errorMessage: messages.ERROR.VALID_SIX_NUMBER,
        },
      ]);
    });
    this.validateWithCondition([
      { condition: validatorUtils.hasNoBlank(winningNumberSplit), errorMessage: messages.ERROR.HAS_BLANK },
    ]);
  },

  validateBonusNumberInput(number) {
    this.validateWithCondition([
      { condition: validatorUtils.isPositiveInteger(+number), errorMessage: messages.ERROR.POSITIVE_INTEGER },
      { condition: validatorUtils.isInRange(+number), errorMessage: messages.ERROR.IN_RANGE },
    ]);
  },

  validateRestartInput(restartInput) {
    this.validateWithCondition([
      { condition: validatorUtils.yOrN(restartInput), errorMessage: messages.ERROR.Y_OR_N },
    ]);
  },
};

export default inputValidator;
