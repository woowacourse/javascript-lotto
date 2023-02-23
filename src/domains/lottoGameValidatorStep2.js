import validator from '../utils/validator.js';
import LOTTO from '../constants/lotto.js';

const lottoGameValidatorStep2 = {
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
