class Lotto {
  static NUMBERS_LENGTH = 6;
  static MIN_LOTTO_NUMBER = 1;
  static MAX_LOTTO_NUMBER = 45;

  #numbers;

  constructor(numbers) {
    this.#validateNumbersLength(numbers);
    this.#validateNumbersInRange(numbers);

    this.#numbers = [...numbers];
  }

  #validateNumbersLength(numbers) {
    if (numbers.length !== Lotto.NUMBERS_LENGTH) {
      throw new Error("[ERROR] 유효한 개수의 로또 숫자가 아닙니다");
    }
  }

  #validateNumbersInRange(numbers) {
    numbers.forEach((number) => this.#validateNumberInRange(number));
  }

  #validateNumberInRange(number) {
    if (number < Lotto.MIN_LOTTO_NUMBER || number > Lotto.MAX_LOTTO_NUMBER) {
      throw new Error("[ERROR] 유효한 범위 로또 숫자가 아닙니다.");
    }
  }
}

export default Lotto;
