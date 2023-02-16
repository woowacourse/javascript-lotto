import { INITIAL_EARNING, PRICE, PRIZE } from '../constants/values';

export class Lotto {
  #numbers = [];

  #drawingNumbers = {
    winningNumbers: [],
    bonusNumber: null,
  };

  constructor(numbers, drawingNumbers) {
    this.#numbers = numbers;
    this.#drawingNumbers = drawingNumbers;
  }

  getNumbers() {
    return this.#numbers;
  }

  getDrawingNumbers() {
    return this.#drawingNumbers;
  }
}

export const LottoStore = {
  purchase(total) {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const DRAWING_NUMBERS = {
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
    };

    return Array(total)
      .fill('lotto')
      .map(() => new Lotto(LOTTO_NUMBERS, DRAWING_NUMBERS));
  },

  draw(lotto) {
    const numbers = lotto.getNumbers();
    const { winningNumbers, bonusNumber } = lotto.getDrawingNumbers();
    const awards = winningNumbers.filter((number) => numbers.includes(number));

    return awards.length === 5 && numbers.includes(bonusNumber) ? 'BONUS' : String(awards.length);
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
