class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  hasNumber(number) {
    return this.#numbers.includes(number);
  }
}

export default Lotto;