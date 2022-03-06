import { ERROR_MESSAGE, LOTTO_RULES } from '../constants/constants';
import { isNumberInRange } from '../utils/utils';

const MatchCalculateMachine = {
  validateWinnerNumberInput({ numbers, bonus }) {
    if (this.hasBlankInput({ numbers, bonus })) {
      throw new Error(ERROR_MESSAGE.EMPTY_WINNER_INPUT);
    }
    const allNumbers = [...numbers, bonus].map((numberString) => Number(numberString));
    if (this.hasDuplicateInput(allNumbers)) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_WINNER_INPUT);
    }
    if (this.hasInvalidLottoNumber(allNumbers)) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMBER_WINNER_INPUT);
    }
  },

  calculateMatchResult(lottoArray, winnerNumbers) {
    const matches = lottoArray.reduce((matchObj, lotto) => {
      const match = this.calculateMatch(lotto, winnerNumbers);
      matchObj[match] = matchObj[match] + 1 || 1;
      return matchObj;
    }, {});

    const profit = this.calculateProfit(matches, lottoArray.length);

    return { matches, profit };
  },

  calculateMatch(lotto, { numbers, bonus }) {
    const match = numbers.filter((number) => lotto.has(number)).length;
    if (match === 5 && lotto.has(bonus)) {
      return '5+';
    }
    return `${match}`;
  },

  calculateProfit(matches, lottoAmount) {
    const prizeMoney = Object.keys(matches).reduce((money, match) => {
      if (LOTTO_RULES.PRIZE[match]) {
        return money + LOTTO_RULES.PRIZE[match] * matches[match];
      }
      return money;
    }, 0);
    const cashInput = lottoAmount * LOTTO_RULES.PRICE;

    return (prizeMoney / cashInput) * 100 - 100;
  },
  hasBlankInput({ numbers, bonus }) {
    return numbers.some((number) => number === '') || numbers.length !== 6 || bonus === '';
  },

  hasDuplicateInput(allNumbers) {
    return new Set(allNumbers).size !== allNumbers.length;
  },

  hasInvalidLottoNumber(allNumbers) {
    return allNumbers.some((number) => this.isInvalidLottoNumber(number));
  },

  isInvalidLottoNumber(number) {
    return (
      !isNumberInRange({
        number,
        max: LOTTO_RULES.NUMBER_RANGE.MAX,
        min: LOTTO_RULES.NUMBER_RANGE.MIN,
      }) || !Number.isInteger(number)
    );
  },
};

export default function calculateNumberMatch(lottoArray, { numbers, bonus }) {
  MatchCalculateMachine.validateWinnerNumberInput({ numbers, bonus });

  const winnerNumbers = {
    numbers: numbers.map((numString) => Number(numString)),
    bonus: Number(bonus),
  };

  return MatchCalculateMachine.calculateMatchResult(lottoArray, winnerNumbers);
}
