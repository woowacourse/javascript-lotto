import validateLottoNumber from '../validations/validate/LottoNumberValidate.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
    this.#validate();
  }

  #validate() {
    validateLottoNumber(this.#numbers);
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
