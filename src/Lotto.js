class Lotto {
  #numbers;

  constructor(numbers) {
    if (numbers.indexOf(0) !== -1 || numbers.indexOf(-1) !== -1) {
      throw new Error("[ERROR]");
    }
    if (numbers.some((number) => number < 1 || number > 45)) {
      throw new Error("[ERROR]");
    }
    if (numbers.length !== new Set(numbers).size) {
      throw new Error("[ERROR]");
    }
    if (numbers.length !== 6) {
      throw new Error("[ERROR]");
    }
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
