import Validator from './Validator.js';

class Lotto {
  #lottoNumber;

  constructor(lottoNumber) {
    this.#validateLottoNumber(lottoNumber);
    this.#lottoNumber = [...lottoNumber];
  }

  getLottoNumber() {
    return [...this.#lottoNumber];
  }

  #validateLottoNumber(lottoNumber) {
    Validator.validateLottoNumberLength(lottoNumber);
    Validator.validateLottoNumberDuplicated(lottoNumber);
    Validator.validateLottoNumberRange(lottoNumber);
  }
}

export default Lotto;
