import { INITIAL_EARNING, LOTTO_COUNT, PRICE, PRIZE } from '../constants/values';
import randomGenerator from '../utils/Random';

export class Lotto {
  #numbers = [];

  #drawingNumbers = {
    winningNumbers: [],
    bonusNumber: null,
  };

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  getNumbers() {
    return this.#numbers;
  }

  getDrawingNumbers() {
    return this.#drawingNumbers;
  }

  setDrawingNumbers(drawingNumbers) {
    this.#drawingNumbers = drawingNumbers;

    return this;
  }
}

export const LottoStore = {
  purchase(total) {
    return Array(total)
      .fill('lotto')
      .map(() => {
        const lottoNumbers = randomGenerator(LOTTO_COUNT);

        return new Lotto(lottoNumbers);
      });
  },

  draw(lotto) {
    const numbers = lotto.getNumbers();
    const { winningNumbers, bonusNumber } = lotto.getDrawingNumbers();
    const awards = winningNumbers.filter((number) => numbers.includes(number));

    return awards.length === 5 && numbers.includes(bonusNumber) ? 'BONUS' : awards.length;
  },

  calculateStatistics(lottoList) {
    const statistics = {};

    lottoList.forEach((lotto) => {
      const result = LottoStore.draw(lotto);

      statistics[result] ? (statistics[result] += 1) : (statistics[result] = 1);
    });

    return statistics;
  },

  calculateEarningRate(lottoList) {
    const TOTAL = lottoList.length;
    const statistics = LottoStore.calculateStatistics(lottoList);

    const earning = Object.entries(statistics).reduce(
      (acc, [rank, count]) => (rank in PRIZE ? acc + PRIZE[rank] * count : acc),
      INITIAL_EARNING
    );

    return ((earning / (PRICE * TOTAL)) * 100).toFixed(1);
  },
};
