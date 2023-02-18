import MESSAGE from '../constants/messages';
import LottoValidatorConditions from './LottoValidatorConditions';

const LottoValidator = {
  validateWithCondition(condition, errorMessage) {
    if (!condition) {
      throw new Error(errorMessage);
    }
  },

  validateMoneyInput(number) {
    this.validateWithCondition(
      LottoValidatorConditions.isPositiveInteger(+number),
      MESSAGE.ERROR.POSITIVE_INTEGER,
    );
    this.validateWithCondition(
      LottoValidatorConditions.isDividedByPrice(+number),
      MESSAGE.ERROR.THOUSANDS_WON,
    );
  },

  validateWinningNumberInput(winningNumber) {
    const splitWinningNumber = winningNumber.split(',');

    splitWinningNumber.forEach(number => {
      this.validateWithCondition(
        LottoValidatorConditions.isPositiveInteger(+number),
        MESSAGE.ERROR.VALID_SIX_NUMBER,
      );
      this.validateWithCondition(LottoValidatorConditions.isInRange(+number), MESSAGE.ERROR.VALID_SIX_NUMBER);
    });

    this.validateWithCondition(
      LottoValidatorConditions.hasNoBlank(winningNumber.split('')),
      MESSAGE.ERROR.HAS_BLANK,
    );
    this.validateWithCondition(
      LottoValidatorConditions.isSixLength(splitWinningNumber),
      MESSAGE.ERROR.NOT_SIX_LENGTH,
    );
    this.validateWithCondition(
      LottoValidatorConditions.isNotOverlap(splitWinningNumber),
      MESSAGE.ERROR.OVERLAP,
    );
  },

  validateBonusNumberInput(winningNumber, number) {
    this.validateWithCondition(
      LottoValidatorConditions.isPositiveInteger(+number),
      MESSAGE.ERROR.POSITIVE_INTEGER,
    );
    this.validateWithCondition(LottoValidatorConditions.isInRange(+number), MESSAGE.ERROR.IN_RANGE);
    this.validateWithCondition(
      LottoValidatorConditions.isBonusNumInWinningNum(winningNumber, number),
      MESSAGE.ERROR.OVERLAP_WINNING_NUM,
    );
  },

  validateRestart(restartOrNot) {
    this.validateWithCondition(LottoValidatorConditions.isYorN(restartOrNot), MESSAGE.ERROR.Y_OR_N);
  },
};

export default LottoValidator;
