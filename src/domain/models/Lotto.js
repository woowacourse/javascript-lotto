class Lotto {
  static MIN_RANGE = 1;
  static MAX_RANGE = 45;
  static SIZE = 6;

  static ERROR = {
    DUPLICATE: "로또번호가 중복됐습니다",
    INVALID_RANGE: "로또번호가 1~45 범위를 벗어났습니다",
    INVALID_SIZE: "로또 갯수는 6개여야 합니다",
  };

  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== Lotto.SIZE) {
      throw new Error(Lotto.ERROR.INVALID_SIZE);
    }
    if (numbers.some((n) => n < Lotto.MIN_RANGE || Lotto.MAX_RANGE < n)) {
      throw new Error(Lotto.ERROR.INVALID_RANGE);
    }
    if (numbers.length !== new Set(numbers).size) {
      throw new Error(Lotto.ERROR.DUPLICATE);
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
