import { LOTTO_RULES } from '../constants/constants';
import { isNumberInRange } from '../utils/utils';

class LottoWinnerMachine {
  constructor() {
    this.deliverMessage = () => {};
    this.prize = LOTTO_RULES.PRIZE;
    this.lottos = [];
    this.numbers = [];
    this.bonus = null;
    this.matches = {};
  }

  assignMessenger(deliverMessage) {
    this.deliverMessage = deliverMessage;
  }

  setWinnerNumbers({ numbers, bonus }) {
    if (!this.#isFullWinnerNumberInput({ numbers, bonus })) {
      throw new Error('6개의 당첨 번호와 보너스 번호를 입력해야 합니다.');
    }
    const allNumbers = [...numbers, bonus].map((numberString) => Number(numberString));
    if (!this.#isUniqueInput(allNumbers)) {
      throw new Error('6개의 당첨 번호와 보너스 번호 중에 중복된 숫자가 있습니다.');
    }
    if (!this.#isValidLottoNumberArray(allNumbers)) {
      throw new Error('6개의 당첨 번호와 보너스 번호는 모두 1-45 사이의 자연수여야 합니다.');
    }
    this.numbers = [...numbers].map((numberString) => Number(numberString));
    this.bonus = bonus;
    this.checkWins();
  }

  checkWins() {
    this.lottos.forEach((lotto) => {
      const match = this.calculateMatch(lotto);
      this.matches[match] = this.matches[match] + 1 || 1;
    });

    this.calculateProfit();
    const matches = { ...this.matches };
    const { profit } = this;
    this.deliverMessage({
      message: 'PROFIT_CALCULATE_COMPLETE',
      to: 'view',
      params: { matches, profit },
    });
  }

  calculateMatch(lotto) {
    const match = this.numbers.filter((number) => lotto.has(number)).length;
    if (match === 5 && lotto.has(this.bonus)) {
      return '5+';
    }
    return `${match}`;
  }

  calculateProfit() {
    const prizeMoney = Object.keys(this.matches).reduce((money, match) => {
      if (this.prize[match]) {
        return money + this.prize[match] * this.matches[match];
      }
      return money;
    }, 0);
    const cashInput = this.lottos.length * LOTTO_RULES.PRICE;

    this.profit = (prizeMoney / cashInput) * 100 - 100;
  }

  receiveLottos(lottos) {
    this.lottos = lottos;
  }

  resetData() {
    this.lottos = [];
    this.numbers = [];
    this.bonus = null;
    this.matches = {};
  }

  #isFullWinnerNumberInput({ numbers, bonus }) {
    return numbers.every((number) => number !== '') && numbers.length === 6 && bonus !== '';
  }

  #isUniqueInput(allNumbers) {
    return new Set(allNumbers).size === allNumbers.length;
  }

  #isValidLottoNumberArray(allNumbers) {
    return allNumbers.every((number) => this.#isValidLottoNumber(number));
  }

  #isValidLottoNumber(number) {
    return (
      isNumberInRange({
        number,
        max: LOTTO_RULES.NUMBER_RANGE.MAX,
        min: LOTTO_RULES.NUMBER_RANGE.MIN,
      }) && Number.isInteger(number)
    );
  }
}

export default LottoWinnerMachine;
