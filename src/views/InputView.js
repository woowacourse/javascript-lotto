import Console from '../utils/Console.js';
import QUERY from '../constants/query.js';
import validator from '../utils/validator.js';
import LOTTO from '../constants/lotto.js';
import ERROR from '../constants/error.js';

const inputView = {
  async readLottoPrice() {
    const lottoPriceText = await Console.readline(QUERY.LOTTO_PRICE);
    const lottoPrice = parseInt(lottoPriceText, 10);

    try {
      if (
        !validator.isFirstLetterNotZero(lottoPriceText) ||
        !validator.isNumericString(lottoPriceText) ||
        !validator.canDivide(lottoPrice, LOTTO.PRICE)
      ) {
        throw new Error(`${ERROR.HEAD}구입금액`);
      }

      return lottoPrice;
    } catch (error) {
      Console.print(error.message);
      return await this.readLottoPrice();
    }
  },

  async readLuckyNumbers() {
    const luckyNumbersText = await Console.readline(QUERY.LUCKY_NUMBERS);

    try {
      if (!validator.isValidFormat(luckyNumbersText)) {
        throw new Error(`${ERROR.HEAD} 당첨번호 형식에러`);
      }
      const luckyNumbers = luckyNumbersText
        .split(',')
        .map(luckyNumber => parseInt(luckyNumber.trim(), 10));
      if (
        !(
          validator.isValidRangeNumbers(luckyNumbers, { min: 1, max: 45 }) &&
          validator.isValidSize(luckyNumbers, 6) &&
          validator.isUnique(luckyNumbers)
        )
      ) {
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
      if (
        !(
          validator.isValidRangeNumber(bonusNumber, {
            min: 1,
            max: 45,
          }) && !validator.isOverlap(luckyNumbers, bonusNumber)
        )
      ) {
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
      if (!validator.isValidCommand(retryCommand)) {
        throw new Error(`${ERROR.HEAD} 게임 재시작 입력 오류`);
      }

      return retryCommand === 'y';
    } catch (error) {
      Console.print(error.message);
      return this.readRetry();
    }
  },
};

export default inputView;
