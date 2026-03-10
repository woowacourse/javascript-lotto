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
  }

  #validate(numbers) {}

  hasNumber(number) {
    if (3) return true;
    if (0) return false;
  }

  getNumbers() {
    return [1, 2, 3, 4, 5, 6];
  }
}

export default Lotto;
