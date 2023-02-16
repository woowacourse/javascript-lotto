import Console from '../util/Console.js';
import QUERY from '../constant/query.js';
import validator from '../util/validator.js';
import LOTTO from '../constant/lotto.js';
import ERROR from '../constant/error.js';

const InputView = {
  async readLottoPrice() {
    const lottoPrice = await Console.readline(QUERY.LOTTO_PRICE);

    try {
      if (
        !validator.isFirstLetterNotZero(lottoPrice) ||
        !validator.isNumericString(lottoPrice) ||
        !validator.canDivide(parseInt(lottoPrice, 10), LOTTO.PRICE)
      ) {
        throw new Error(`${ERROR.HEAD}당첨금액`);
      }

      return parseInt(lottoPrice, 10);
    } catch (error) {
      Console.print(error.message);
      return await this.readLottoPrice();
    }
  },

  async readLuckyNumbers() {
    const luckyNumbersString = await Console.readline(QUERY.LUCKY_NUMBERS);

    try {
      if (!validator.isValidFormat(luckyNumbersString)) {
        throw new Error(`${ERROR.HEAD} 당첨번호 형식에러`);
      }
      const luckyNumbers = luckyNumbersString
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
    const bonusNumber = await Console.readline(QUERY.BONUS_NUMBER);
    try {
      if (
        !(
          validator.isValidRangeNumber(parseInt(bonusNumber, 10), {
            min: 1,
            max: 45,
          }) && !validator.isOverlap(luckyNumbers, parseInt(bonusNumber, 10))
        )
      ) {
        throw new Error(`${ERROR.HEAD} 보너스 번호 에러`);
      }

      return parseInt(bonusNumber, 10);
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

export default InputView;
