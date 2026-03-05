class Lotto {
  static MIN_RANGE = 1;
  static MAX_RANGE = 45;
  static SIZE = 6;

  static ERROR = {
    DUPLICATE: "[ERROR] 로또 번호는 중복되지 않아야 합니다.",
    INVALID_RANGE: "[ERROR] 로또 번호는 1~45 사이의 숫자여야 합니다.",
    INVALID_SIZE: "[ERROR] 로또 번호는 6개여야 합니다.",
  };

  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.length !== Lotto.SIZE) {
      throw new Error(Lotto.ERROR.INVALID_SIZE);
    }

    if (new Set(numbers).size !== numbers.length) {
      throw new Error(Lotto.ERROR.DUPLICATE);
    }

    if (numbers.some((n) => n < Lotto.MIN_RANGE || n > Lotto.MAX_RANGE)) {
      throw new Error(Lotto.ERROR.INVALID_RANGE);
    }
  }

  hasNumber(number) {
    return this.#numbers.includes(number);
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
