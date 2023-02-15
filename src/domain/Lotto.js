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
    /** @todo 매직넘버 */
    const TOTAL = amount / 1000;

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
    const PRIZE = Object.freeze({
      3: 5_000,
      4: 50_000,
      5: 1_500_000,
      BONUS: 30_000_000,
      6: 2_000_000_000,
    });

    /** @todo acc naming */
    const earning = Object.entries(statistics).reduce(
      (acc, [award, count]) => (award in PRIZE ? acc + PRIZE[award] * count : acc),
      0
    );

    return ((earning / (1000 * TOTAL)) * 100).toFixed(1);
  },
};
