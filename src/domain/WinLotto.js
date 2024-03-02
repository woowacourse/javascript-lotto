import LottoValidation from '../validation/lottoValidation.js';

/**
 * @module WinLotto 우승한 로또의 모듈입니다. 보너스 숫자의 유효성 검사를 진행합니다.
 * @constructor
 * @param {lotto} lotto - 우승 숫자 6개를 담은 로또 인스턴스입니다.
 * @param {number} bonusNumber - 로또의 보너스 숫자입니다.
 */

class WinLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    this.#bonusNumber = bonusNumber;
    this.#validate();
  }

  #validate() {
    const lottoNumbers = this.#lotto.numbers;
    LottoValidation.validateDuplicationNumbers([...lottoNumbers, this.#bonusNumber]);
    LottoValidation.validateInNumbersRange([this.#bonusNumber]);
  }

  get winNumbers() {
    return this.#lotto.numbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}

export default WinLotto;
