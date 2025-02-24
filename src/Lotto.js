class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  getMatchedCount(winning) {
    return this.#numbers.filter((num) => winning.includes(num)).length;
  }

  hasBonus(bonus) {
    return this.#numbers.includes(bonus);
  }
}

export default Lotto;
