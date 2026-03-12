export default class Lotto {
  static POLICY = Object.freeze({
    MIN_RANGE: 1,
    MAX_RANGE: 45,
    SIZE: 6,
  });

  static ERROR = Object.freeze({
    DUPLICATE: "로또번호가 중복됐습니다",
    INVALID_RANGE: `로또번호가 ${Lotto.POLICY.MIN_RANGE}~${Lotto.POLICY.MAX_RANGE} 범위를 벗어났습니다`,
    INVALID_SIZE: `로또 갯수는 ${Lotto.POLICY.SIZE}개여야 합니다`,
  });

  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    const { SIZE, MIN_RANGE, MAX_RANGE } = Lotto.POLICY;
    if (numbers.length !== SIZE) {
      throw new Error(Lotto.ERROR.INVALID_SIZE);
    }
    if (numbers.some((n) => n < MIN_RANGE || MAX_RANGE < n)) {
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
