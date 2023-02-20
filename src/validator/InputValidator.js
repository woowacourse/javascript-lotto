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
      { condition: validatorUtils.isPositiveInteger(+number), errorMessage: messages.error.positiveInteger },
      { condition: validatorUtils.isThousandsOfWon(+number), errorMessage: messages.error.thousandsWon },
    ]);
  },

  validateWinningNumberInput(winningNumber) {
    const winningNumberSplit = winningNumber.split(',');

    winningNumberSplit.forEach(number => {
      this.validateWithCondition([
        {
          condition: validatorUtils.isPositiveInteger(+number),
          errorMessage: messages.error.validSixNumbers,
        },
        {
          condition: validatorUtils.isInRange(+number),
          errorMessage: messages.error.validSixNumbers,
        },
      ]);
    });
    this.validateWithCondition([
      { condition: validatorUtils.hasNoBlank(winningNumberSplit), errorMessage: messages.error.hasBlank },
    ]);
  },

  validateBonusNumberInput(number) {
    this.validateWithCondition([
      { condition: validatorUtils.isPositiveInteger(+number), errorMessage: messages.error.POSITIVE_INTEGER },
      { condition: validatorUtils.isInRange(+number), errorMessage: messages.error.inRange },
    ]);
  },

  validateRestartInput(restartInput) {
    this.validateWithCondition([
      { condition: validatorUtils.yOrN(restartInput), errorMessage: messages.error.yOrN },
    ]);
  },
};

export default inputValidator;
