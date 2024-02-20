class Lotto {
  constructor(numbers) {
    this.#validateDuplicate(numbers);
  }

  #validateDuplicate(numbers) {
    if (new Set(numbers).size !== 6) {
      throw new Error("[ERROR]");
    }
  }
}
export default Lotto;
