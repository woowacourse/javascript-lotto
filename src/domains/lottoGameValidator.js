import LOTTO from '../constants/lotto.js';
import LOTTO_GAME from '../constants/lottoGame.js';
import validator from '../utils/validator.js';
import parseNumbers from '../utils/parseNumbers.js';

const lottoGameValidator = {
  isValidLottosPrice(lottosPriceText) {
    const lottosPrice = parseInt(lottosPriceText, 10);

    return (
      validator.isFirstLetterNotZero(lottosPriceText) &&
      validator.isNumericString(lottosPriceText) &&
      validator.canDivide(lottosPrice, LOTTO.PRICE)
    );
  },

  isValidLuckyNumbers(luckyNumbersText) {
    const luckyNumbers = parseNumbers(luckyNumbersText, ',');

    return (
      this.isValidLuckyNumbersFormat(luckyNumbersText) &&
      validator.isValidRangeNumbers(luckyNumbers, { min: LOTTO.MIN_RANGE, max: LOTTO.MAX_RANGE }) &&
      validator.isValidSize(luckyNumbers, LOTTO.NUMBERS_LENGTH) &&
      validator.isUnique(luckyNumbers)
    );
  },

  isValidLuckyNumbersFormat(luckyNumbersText) {
    const NUMBER_COMMA = /^(\d{1,2}[,]){5}\d{1,2}$/;
    const NUMBER_COMMA_SPACE = /^(\d{1,2}[,]\s){5}\d{1,2}$/;

    if (NUMBER_COMMA.test(luckyNumbersText)) return true;
    if (NUMBER_COMMA_SPACE.test(luckyNumbersText)) return true;

    return false;
  },

  isValidBonusNumber(bonusNumberText, luckyNumbers) {
    const bonusNumber = parseInt(bonusNumberText, 10);
    const BONUS_NUMBER = /^\d{1,2}$/;
    return (
      BONUS_NUMBER.test(bonusNumberText) &&
      validator.isFirstLetterNotZero(bonusNumberText) &&
      validator.isValidRangeNumber(bonusNumber, { min: LOTTO.MIN_RANGE, max: LOTTO.MAX_RANGE }) &&
      !validator.isOverlap(bonusNumber, luckyNumbers)
    );
  },

  isValidRetryCommand(command) {
    return command === LOTTO_GAME.RETRY || command === LOTTO_GAME.QUIT;
  },
};

export default lottoGameValidator;
