import { PRICE, PRIZE } from '../constants/values';

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
  purchase(amount) {
    const TOTAL = amount / PRICE;

    return Array(TOTAL)
      .fill('lotto')
      .map(() => new Lotto());
  },

  draw(lotto) {
    const numbers = lotto.getNumbers();
    const { winningNumbers, bonusNumber } = lotto.getDrawingNumbers();
    const awards = [];

    winningNumbers.forEach((number) => numbers.includes(number) && awards.push(number));

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
      (acc, [award, count]) => (award in PRIZE ? acc + PRIZE[award] * count : acc),
      0
    );

    return ((earning / (PRICE * TOTAL)) * 100).toFixed(1);
  },
};
