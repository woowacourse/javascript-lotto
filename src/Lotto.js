class Lotto {
  #numbers;

  static UNIT = 1000;
  static MAX = 45;
  static MIN = 1;
  static LENGTH = 6;

  constructor(numbers) {
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
