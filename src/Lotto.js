class Lotto {
  #numbers;

  constructor(numbers) {
    if (numbers.indexOf(0) !== -1 || numbers.indexOf(-1) !== -1) {
      throw new Error("[ERROR]");
    }
    this.#numbers = numbers;
  }
}

export default Lotto;
