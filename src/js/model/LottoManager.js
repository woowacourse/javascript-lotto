import Lotto from './Lotto.js';
import { LOTTO, LOTTO_REWARD } from '../utils/constants.js';
import { generateRandomNumber, sortNumbers } from '../utils/common.js';

export default class LottoManager {
  constructor(lottos = []) {
    this.lottos = lottos;
    this.listeners = [];
    this.winningCount = {};
  }

  createLottos(lottoCount) {
    const lottos = Array.from(
      { length: lottoCount },
      () => new Lotto(this.generateLottoNumbers()),
    );

    this.setState({ lottos });
  }

  decideWinners(winningNumbers, bonusNumber) {
    const winningCount = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
    };

    const getMatchedCount = numbers => {
      let count = 0;
      numbers.forEach(number => {
        if (winningNumbers.includes(number)) count++;
      });
      return count;
    };

    const updateWinningCount = (numbers, count) => {
      if (count === 6) {
        winningCount[`FIRST`]++;
      } else if (count === 5 && numbers.includes(bonusNumber)) {
        winningCount[`SECOND`]++;
      } else if (count === 5) {
        winningCount[`THIRD`]++;
      } else if (count === 4) {
        winningCount[`FOURTH`]++;
      } else if (count === 3) {
        winningCount[`FIFTH`]++;
      }
    };

    this.lottos.forEach(({ numbers }) => {
      updateWinningCount(numbers, getMatchedCount(numbers));
    });

    this.setState({ winningCount });
  }

  calculateProfitMargin() {
    const investment = this.lottos.length * LOTTO.PRICE;
    const profit = Object.keys(this.winningCount).reduce(
      (profit, key) => profit + LOTTO_REWARD[key] * this.winningCount[key],
      0,
    );

    return ((profit - investment) / investment) * 100;
  }

  generateLottoNumbers() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < LOTTO.LENGTH) {
      lottoNumbers.add(generateRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
    }

    return sortNumbers([...lottoNumbers]);
  }

  static isValidLottoNumbers(numbers) {
    return (
      numbers.length === LOTTO.LENGTH &&
      new Set(numbers).size === numbers.length
    );
  }

  resetState() {
    this.setState({ lottos: [], winningCount: {} });
  }

  setState({ lottos, winningCount }) {
    this.lottos = lottos ?? this.lottos;
    this.winningCount = winningCount ?? this.winningCount;

    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener());
  }
}
