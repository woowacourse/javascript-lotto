import LottoValidation from '../validation/lottoValidation';

/**
 * @module Lotto 숫자 6개를 가지고 있는 로또의 모듈입니다. 숫자의 유효성 검사를 진행합니다.
 * @constructor
 * @param numbers - 숫자 6개를 넣습니다.
 */

class Lotto {
  #numbers;

  constructor(numbers = []) {
    LottoValidation.validateNumbers(numbers);
    this.#numbers = this.sortNumbers(numbers);
  }

  sortNumbers(numbers = []) {
    return numbers.sort((a, b) => a - b);
  }

  get numbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
