class Lotto {
  #numbers;

  constructor(numbers, { minNumber, maxNumber, count }) {
    if (numbers.some(Number.isNaN)) {
      throw new Error('[ERROR]1 ');
    }

    if (!numbers.every((number) => number >= minNumber && number <= maxNumber)) {
      throw new Error('[ERROR]2 ');
    }

    if (numbers.length !== count) {
      throw new Error('[ERROR]3 ');
    }

    if (numbers.length !== new Set(numbers).size) {
      throw new Error('[ERROR]4 ');
    }

    this.#numbers = new Set(numbers);
  }

  includes(targetNumber) {
    return this.#numbers.has(targetNumber);
  }

  getNumbers() {
    return new Set([...this.#numbers]);
  }
}

export default Lotto;
