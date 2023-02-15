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
};
