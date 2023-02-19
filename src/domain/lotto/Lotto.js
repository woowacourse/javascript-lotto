class Lotto {
  #numbers;

  constructor(numbers, { minNumber, maxNumber, count }) {
    if (numbers.every((number) => typeof number !== 'number' || Number.isNaN(number))) {
      throw new Error('[ERROR] ');
    }

    if (numbers.every((number) => number > maxNumber || number < minNumber)) {
      throw new Error('[ERROR] ');
    }

    if (numbers.length !== count) {
      throw new Error('[ERROR] ');
    }

    if (numbers.length !== new Set(numbers).size) {
      throw new Error('[ERROR] ');
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

// TODO: 주석 삭제
// const lotto = new Lotto([1, 2, 3, 4, 5, 6], { minNumber: 1, maxNumber: 45, count: 6 }); // ?
// lotto.includes(5); // ?
// lotto.includes(7); // ?
// lotto.getNumbers(); // ?
