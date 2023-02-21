export default class Lotto {
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
