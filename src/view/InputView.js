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
    }

    await this.readLottoPrice();
  },

  /**
	 * 
	 *- [ ]  예외) 숫자,숫자 형식이 아닌 경우
    - [ ]  예외) 1 ~ 45 사이의 숫자가 아닌 경우
    - [ ]  예외) 6개의 숫자가 아닌 경우
    - [ ]  예외) 중복인 경우
	 */
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
    }

    await this.readLuckyNumbers();
  },

  async readBonusNumber() {
    const bonusNumber = await Console.readline(QUERY.BONUS_NUMBER);

    return parseInt(bonusNumber, 10);
  },

  async readRetry() {
    const isRetry =
      (await Console.readline(QUERY.RETRY)) === 'y' ? true : false;

    return isRetry;
  },
};

export default InputView;
