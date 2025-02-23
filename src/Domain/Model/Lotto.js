class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getNumbers() {
    return [...this.#numbers];
  }

  has(number) {
    return this.#numbers.includes(number);
  }

  match(targetLotto) {
    return this.#numbers.filter((number) => targetLotto.has(number)).length;
  }
}

export default Lotto;
