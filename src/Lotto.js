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

  includes(number) {
    return this.#numbers.includes(number);
  }

  matchCount(winningNumbers) {
    const numbersSet = new Set([...winningNumbers, ...this.#numbers]);
    return this.#numbers.length + winningNumbers.length - numbersSet.size;
  }
}

export default Lotto;
