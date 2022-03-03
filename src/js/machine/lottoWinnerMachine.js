import { LOTTO_RULES } from '../constants/constants';
import { isNumberInRange } from '../utils/utils';

class LottoWinnerMachine {
  getMatches(lottoArray, { numbers, bonus }) {
    this.#validateWinnerNumberInput({ numbers, bonus });
    const winnerNumbers = {
      numbers: [...numbers].map((numberString) => Number(numberString)),
      bonus,
    };
    const matchResult = this.#calculateMatchResult(lottoArray, winnerNumbers);
    return matchResult;
  }

  #validateWinnerNumberInput({ numbers, bonus }) {
    if (this.#hasBlankInput({ numbers, bonus })) {
      throw new Error('6개의 당첨 번호와 보너스 번호를 입력해야 합니다.');
    }
    const allNumbers = [...numbers, bonus].map((numberString) => Number(numberString));
    if (this.#hasDuplicateInput(allNumbers)) {
      throw new Error('6개의 당첨 번호와 보너스 번호 중에 중복된 숫자가 있습니다.');
    }
    if (this.#hasInvalidLottoNumber(allNumbers)) {
      throw new Error('6개의 당첨 번호와 보너스 번호는 모두 1-45 사이의 자연수여야 합니다.');
    }
  }

  #calculateMatchResult(lottoArray, winnerNumbers) {
    const matches = {};
    lottoArray.forEach((lotto) => {
      const match = this.#calculateMatch(lotto, winnerNumbers);
      matches[match] = matches[match] + 1 || 1;
    });

    const profit = this.#calculateProfit(matches, lottoArray.length);

    return { matches, profit };
  }

  #calculateMatch(lotto, { numbers, bonus }) {
    const match = numbers.filter((number) => lotto.has(number)).length;
    if (match === 5 && lotto.has(bonus)) {
      return '5+';
    }
    return `${match}`;
  }

  #calculateProfit(matches, lottoAmount) {
    const prizeMoney = Object.keys(matches).reduce((money, match) => {
      if (LOTTO_RULES.PRIZE[match]) {
        return money + LOTTO_RULES.PRIZE[match] * matches[match];
      }
      return money;
    }, 0);
    const cashInput = lottoAmount * LOTTO_RULES.PRICE;

    return (prizeMoney / cashInput) * 100 - 100;
  }

  #hasBlankInput({ numbers, bonus }) {
    return numbers.some((number) => number === '') || numbers.length !== 6 || bonus === '';
  }

  #hasDuplicateInput(allNumbers) {
    return new Set(allNumbers).size !== allNumbers.length;
  }

  #hasInvalidLottoNumber(allNumbers) {
    return allNumbers.some((number) => this.#isInvalidLottoNumber(number));
  }

  #isInvalidLottoNumber(number) {
    return (
      !isNumberInRange({
        number,
        max: LOTTO_RULES.NUMBER_RANGE.MAX,
        min: LOTTO_RULES.NUMBER_RANGE.MIN,
      }) || !Number.isInteger(number)
    );
  }
}

export default LottoWinnerMachine;
