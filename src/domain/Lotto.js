class Lotto {
  static NUMBERS_LENGTH = 6;

  #numbers;

  constructor(numbers) {
    this.#validateNumbersLength(numbers);
    this.#numbers = [...numbers];
  }

  #validateNumbersLength(numbers) {
    if (!this.#isValidNumbersLength(numbers))
      throw new Error("[ERROR]유효한 개수의 로또 숫자가 아닙니다");
  }

  #isValidNumbersLength(numbers) {
    return numbers.length === 6;
  }
}

export default Lotto;
