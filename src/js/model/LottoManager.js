import Lotto from './Lotto.js';
import { LOTTO, LOTTO_REWARD, MATCH_COUNT } from '../utils/constants.js';
import { generateRandomNumber, sortNumbers } from '../utils/common.js';

export default class LottoManager {
  constructor(lottos = []) {
    this.lottos = lottos;
    this.winningResult = {};

    this.listeners = [];
  }

  createLottos(lottoCount) {
    const lottos = Array.from(
      { length: lottoCount },
      () => new Lotto(this.generateLottoNumbers()),
    );

    this.setState({ lottos });
  }

  generateLottoNumbers() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < LOTTO.LENGTH) {
      lottoNumbers.add(generateRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
    }

    return sortNumbers([...lottoNumbers]);
  }

  decideWinners(winningNumbers, bonusNumber) {
    const counts = this.lottos.map(lotto =>
      lotto.getMatchedCount(winningNumbers, bonusNumber),
    );
    const winningResult = this.calculateWinningResult(counts);

    this.setState({ winningResult });
  }

  calculateWinningResult(counts) {
    const winningResult = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
    };

    const calculate = count => {
      if (count === MATCH_COUNT.FIRST) {
        winningResult[`FIRST`]++;
      } else if (count === MATCH_COUNT.SECOND) {
        winningResult[`SECOND`]++;
      } else if (count === MATCH_COUNT.THIRD) {
        winningResult[`THIRD`]++;
      } else if (count === MATCH_COUNT.FOURTH) {
        winningResult[`FOURTH`]++;
      } else if (count === MATCH_COUNT.FIFTH) {
        winningResult[`FIFTH`]++;
      }
    };

    counts.forEach(calculate);
    return winningResult;
  }

  calculateProfitMargin() {
    const investment = this.lottos.length * LOTTO.PRICE;
    let totalProfit = 0;

    for (const key of Object.keys(this.winningResult)) {
      const profit = LOTTO_REWARD[key] * this.winningResult[key];
      totalProfit += profit || 0;
    }

    return ((totalProfit - investment) / investment) * 100;
  }

  static isValidLottoNumbers(numbers) {
    return (
      numbers.length === LOTTO.LENGTH &&
      new Set(numbers).size === numbers.length
    );
  }

  resetState() {
    this.setState({ lottos: [], winningResult: {} });
  }

  setState({ lottos, winningResult }) {
    this.lottos = lottos ?? this.lottos;
    this.winningResult = winningResult ?? this.winningResult;

    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener());
  }
}
