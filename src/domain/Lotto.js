import {
  THIRD_PLACE,
  INITIAL_EARNING,
  LOTTO_COUNT,
  PRICE,
  PRIZE,
  SECOND_PLACE,
} from '../constants/values.js';
import randomGenerator from '../utils/Random.js';

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
  purchase(lottoCount) {
    return Array(lottoCount)
      .fill()
      .map(() => new Lotto(randomGenerator(LOTTO_COUNT)));
  },

  draw(lotto) {
    const numbers = lotto.getNumbers();
    const { winningNumbers, bonusNumber } = lotto.getDrawingNumbers();
    const awards = winningNumbers.filter((number) => numbers.includes(number));

    return awards.length === THIRD_PLACE && numbers.includes(bonusNumber)
      ? SECOND_PLACE
      : awards.length;
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
