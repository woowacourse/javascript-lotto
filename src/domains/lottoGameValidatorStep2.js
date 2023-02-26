import validator from '../utils/validator.js';
import LOTTO from '../constants/lotto.js';
import ERROR from '../constants/error.js';

const lottoGameValidatorStep2 = {
  throwErrorIfInvalidBuyMoney(buyMoney) {
    if (this.isValidBuyMoney(buyMoney)) return true;
    throw new Error(ERROR.BUY_MONEY);
  },

  throwErrorIfInvalidLuckyNumbers(luckyNumbers) {
    if (this.isValidLuckyNumbers(luckyNumbers)) return true;
    throw new Error(ERROR.LUCKY_NUMBERS);
  },

  throwErrorIfInvalidBonusNumber(bonusNumber, luckyNumbers) {
    if (this.isValidBonusNumber(bonusNumber, luckyNumbers)) return true;
    throw new Error(ERROR.BONUS_NUMBER);
  },

  isValidBuyMoney(buyMoney) {
    if (buyMoney <= 0) return false;
    return validator.canDivide(buyMoney, LOTTO.PRICE);
  },

  isValidLuckyNumbers(luckyNumbers) {
    return (
      validator.isValidRangeNumbers(luckyNumbers, { min: LOTTO.MIN_RANGE, max: LOTTO.MAX_RANGE }) &&
      validator.isValidSize(luckyNumbers, LOTTO.NUMBERS_LENGTH) &&
      validator.isUnique(luckyNumbers)
    );
  },

  isValidBonusNumber(bonusNumber, luckyNumbers) {
    return (
      validator.isValidRangeNumber(bonusNumber, { min: LOTTO.MIN_RANGE, max: LOTTO.MAX_RANGE }) &&
      !validator.isOverlap(bonusNumber, luckyNumbers)
    );
  },
};

export default lottoGameValidatorStep2;
