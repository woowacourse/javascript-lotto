class Lotto {
  static NUMBERS_LENGTH = 6;
  static MIN_LOTTO_NUMBER = 1;
  static MAX_LOTTO_NUMBER = 45;

  #numbers;

  constructor(numbers) {
    this.#validateNumbers(numbers);

    this.#numbers = this.#sortAscendingNumbers([...numbers]);
  }

  getNumbers() {
    return [...this.#numbers];
  }

  #validateNumbers(numbers) {
    this.#validateNumbersLength(numbers);
    this.#validateIntegers(numbers);
    this.#validateNumbersInRange(numbers);
    this.#validateUniqueNumbers(numbers);
  }

  #validateIntegers(numbers) {
    numbers.forEach((number) => this.#validateInteger(number));
  }

  #validateInteger(number) {
    if (!Number.isInteger(number)) {
      throw new Error("[ERROR] 정수가 아닌 값입니다.");
    }
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

  #validateUniqueNumbers(numbers) {
    if (numbers.length !== new Set(numbers).size) {
      throw new Error("[ERROR] 중복된 숫자가 포합됩니다.");
    }
  }

  #sortAscendingNumbers(numbers) {
    return numbers.sort((a, b) => a - b);
  }
}

export default Lotto;
