class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    const MIN_LOTTO_NUMBER = 1;
    const MAX_LOTTO_NUMBER = 45;
    const isValidLottoNumber = (
      number,
    ) => number >= MIN_LOTTO_NUMBER && number <= MAX_LOTTO_NUMBER;
    if (!numbers.every(isValidLottoNumber)) {
      throw new Error('[ERROR] 로또 번호의 숫자 범위 1 ~ 45이다.');
    }
  }
}

export default Lotto;
