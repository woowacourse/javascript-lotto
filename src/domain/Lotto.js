class Lotto {
  static NUMBERS_LENGTH = 6;
  static MIN_LOTTO_NUMBER = 1;
  static MAX_LOTTO_NUMBER = 45;

  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getCopyAscendingNumbers() {
    return [...this.#numbers].sort((a, b) => a - b);
  }
}

export default Lotto;
