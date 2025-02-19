import CONFIG from './constants/config.js';

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
    const isValidLottoNumber = (
      number,
    ) => number >= CONFIG.MIN.LOTTO_NUMBER && number <= CONFIG.MAX.LOTTO_NUMBER;
    if (!numbers.every(isValidLottoNumber)) {
      throw new Error('[ERROR] 로또 번호의 숫자 범위 1 ~ 45이다.');
    }
  }
}

export default Lotto;
