import QUERY from '../constants/query.js';
import ERROR from '../constants/error.js';
import Console from '../utils/Console.js';
import parseNumbers from '../utils/parseNumbers.js';
import lottoGameValidator from '../domains/lottoGameValidator.js';

const inputView = {
  async readBuyMoney() {
    const buyMoneyText = await Console.readline(QUERY.LOTTO_PRICE);
    const buyMoney = parseInt(buyMoneyText, 10);

    try {
      if (!lottoGameValidator.isValidBuyMoney(buyMoneyText)) {
        throw new Error(`${ERROR.HEAD}구입금액`);
      }

      return buyMoney;
    } catch (error) {
      Console.print(error.message);
      return await this.readBuyMoney();
    }
  },

  async readLuckyNumbers() {
    const luckyNumbersText = await Console.readline(QUERY.LUCKY_NUMBERS);
    const luckyNumbers = parseNumbers(luckyNumbersText, ',');

    try {
      if (!lottoGameValidator.isValidLuckyNumbers(luckyNumbersText)) {
        throw new Error(`${ERROR.HEAD} 당첨번호 에러`);
      }

      return luckyNumbers;
    } catch (error) {
      Console.print(error.message);
      return await this.readLuckyNumbers();
    }
  },

  async readBonusNumber(luckyNumbers) {
    const bonusNumberText = await Console.readline(QUERY.BONUS_NUMBER);
    const bonusNumber = parseInt(bonusNumberText, 10);

    try {
      if (!lottoGameValidator.isValidBonusNumber(bonusNumberText, luckyNumbers)) {
        throw new Error(`${ERROR.HEAD} 보너스 번호 에러`);
      }

      return bonusNumber;
    } catch (error) {
      Console.print(error.message);
      return await this.readBonusNumber(luckyNumbers);
    }
  },

  async readRetry() {
    const retryCommand = await Console.readline(QUERY.RETRY);

    try {
      if (!lottoGameValidator.isValidRetryCommand(retryCommand)) {
        throw new Error(`${ERROR.HEAD} 게임 재시작 입력 오류`);
      }

      return retryCommand;
    } catch (error) {
      Console.print(error.message);
      return this.readRetry();
    }
  },
};

export default inputView;
