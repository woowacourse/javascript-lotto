class Lotto {
  constructor(numbers) {
    this.#validateDuplicate(numbers);
    this.#validateRange(numbers);
  }

  #validateDuplicate(numbers) {
    if (new Set(numbers).size !== 6) {
      throw new Error("[ERROR]");
    }
  }

  #validateRange(numbers) {
    if (numbers.filter((number) => number < 1 || number > 45)) {
      throw new Error("[ERROR]");
    }
  }
}
export default Lotto;
