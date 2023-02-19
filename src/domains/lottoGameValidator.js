import LOTTO from '../constants/lotto.js';
import ERROR from '../constants/error.js';
import LOTTO_GAME from '../constants/lottoGame.js';
import validator from '../utils/validator.js';
import parseNumbers from '../utils/parseNumbers.js';

const lottoGameValidator = {
  throwErrorIfInvalidBuyMoney(buyMoneyText) {
    if (this.isValidBuyMoney(buyMoneyText)) return;
    throw new Error(ERROR.BUY_MONEY);
  },

  throwErrorIfInvalidLuckyNumbers(luckyNumbersText) {
    if (this.isValidLuckyNumbers(luckyNumbersText)) return;
    throw new Error(ERROR.LUCKY_NUMBERS);
  },

  throwErrorIfInvalidBonusNumber(bonusNumberText, luckyNumbers) {
    if (this.isValidBonusNumber(bonusNumberText, luckyNumbers)) return;
    throw new Error(ERROR.BONUS_NUMBER);
  },

  throwErrorIfInvalidRetryCommand(retryCommand) {
    if (this.isValidRetryCommand(retryCommand)) return;
    throw new Error(ERROR.RETRY_COMMAND);
  },

  isValidBuyMoney(buyMoneyText) {
    const buyMoney = parseInt(buyMoneyText, 10);

    return (
      validator.isFirstLetterNotZero(buyMoneyText) &&
      validator.isNumericString(buyMoneyText) &&
      validator.canDivide(buyMoney, LOTTO.PRICE)
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
