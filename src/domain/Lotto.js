import { AWARDS, LOTTO, PRIZE } from '../constants/values.js';
import randomGenerator from '../utils/Random.js';

export class Lotto {
  #numbers = [];

  #drawingNumbers = {
    winningNumbers: [],
    bonusNumber: 0,
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
  }
}

export const LottoStore = {
  purchase(total) {
    return Array(total)
      .fill()
      .map(() => new Lotto(randomGenerator(LOTTO.LOTTO_COUNT)));
  },

  draw(lotto) {
    const numbers = lotto.getNumbers();
    const { winningNumbers, bonusNumber } = lotto.getDrawingNumbers();

    const awards = [...winningNumbers, bonusNumber].filter((number) => numbers.includes(number));
    return awards.length === AWARDS.THIRD_PLACE && awards.includes(bonusNumber)
      ? AWARDS.SECOND_PLACE
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
      AWARDS.INITIAL_EARNING
    );
    const earningRate = Number(((earning / (LOTTO.PRICE * TOTAL)) * 100).toFixed(1));

    return Number.isNaN(earningRate) ? 0 : earningRate;
  },
};
