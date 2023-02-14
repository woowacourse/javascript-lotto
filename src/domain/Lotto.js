class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  validateLotto(numbers) {
    if (
      !numbers.every((num) => {
        1 < num && num < 45;
      })
    )
      throw new Error();
  }
}

module.exports = Lotto;
