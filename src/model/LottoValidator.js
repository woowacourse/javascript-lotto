import messages from '../constants/messages';
import LottoValidatorConditions from './LottoValidatorConditions';

const LottoValidator = {
  validateWithCondition(condition, errorMessage) {
    if (!condition) {
      throw new Error(errorMessage);
    }
  },

  validateMoneyInput(number) {
    this.validateWithCondition(LottoValidatorConditions.isPositiveInteger(+number), messages.ERROR.POSITIVE_INTEGER);
    this.validateWithCondition(LottoValidatorConditions.isDividedByPrice(+number), messages.ERROR.THOUSANDS_WON);
  },

  validateWinningNumberInput(winningNumber) {
    const splitWinningNumber = winningNumber.split(',');

    splitWinningNumber.forEach(number => {
      this.validateWithCondition(LottoValidatorConditions.isPositiveInteger(+number), messages.ERROR.VALID_SIX_NUMBER);
      this.validateWithCondition(LottoValidatorConditions.isInRange(+number), messages.ERROR.VALID_SIX_NUMBER);
    });

    this.validateWithCondition(LottoValidatorConditions.hasNoBlank(winningNumber.split('')), messages.ERROR.HAS_BLANK);
    this.validateWithCondition(LottoValidatorConditions.isSixLength(splitWinningNumber), messages.ERROR.NOT_SIX_LENGTH);
    this.validateWithCondition(LottoValidatorConditions.isNotOverlap(splitWinningNumber), messages.ERROR.OVERLAP);
  },

  validateBonusNumberInput(winningNumber, number) {
    this.validateWithCondition(LottoValidatorConditions.isPositiveInteger(+number), messages.ERROR.POSITIVE_INTEGER);
    this.validateWithCondition(LottoValidatorConditions.isInRange(+number), messages.ERROR.IN_RANGE);
    this.validateWithCondition(
      LottoValidatorConditions.isBonusNumInWinningNum(winningNumber, number),
      messages.ERROR.OVERLAP_WINNING_NUM,
    );
  },

  validateRestart(restartOrNot) {
    this.validateWithCondition(LottoValidatorConditions.isYorN(restartOrNot), messages.ERROR.Y_OR_N);
  },
};

export default LottoValidator;
