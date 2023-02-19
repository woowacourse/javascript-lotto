import QUERY from '../constants/query.js';
import Console from '../utils/Console.js';
import parseNumbers from '../utils/parseNumbers.js';
import lottoGameValidator from '../domains/lottoGameValidator.js';

const inputView = {
  async readBuyMoney() {
    const buyMoneyText = await Console.readline(QUERY.LOTTO_PRICE);
    try {
      lottoGameValidator.throwErrorIfInvalidBuyMoney(buyMoneyText);
      return parseInt(buyMoneyText, 10);
    } catch (error) {
      Console.print(error.message);
      return this.readBuyMoney();
    }
  },

  async readLuckyNumbers() {
    const luckyNumbersText = await Console.readline(QUERY.LUCKY_NUMBERS);
    try {
      lottoGameValidator.throwErrorIfInvalidLuckyNumbers(luckyNumbersText);
      return parseNumbers(luckyNumbersText, ',');
    } catch (error) {
      Console.print(error.message);
      return this.readLuckyNumbers();
    }
  },

  async readBonusNumber(luckyNumbers) {
    const bonusNumberText = await Console.readline(QUERY.BONUS_NUMBER);
    try {
      lottoGameValidator.throwErrorIfInvalidBonusNumber(bonusNumberText, luckyNumbers);
      return parseInt(bonusNumberText, 10);
    } catch (error) {
      Console.print(error.message);
      return this.readBonusNumber(luckyNumbers);
    }
  },

  async readRetry() {
    const retryCommand = await Console.readline(QUERY.RETRY);
    try {
      lottoGameValidator.throwErrorIfInvalidRetryCommand(retryCommand);
      return retryCommand;
    } catch (error) {
      Console.print(error.message);
      return this.readRetry();
    }
  },
};

export default inputView;
