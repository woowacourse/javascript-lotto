import { ERROR_MESSAGE } from '../constants/message';

/**
 * @module WinLotto 우승한 로또의 모듈입니다. 보너스 숫자의 유효성 검사를 진행합니다.
 * @constructor
 * @param lotto - 우승 숫자 6개를 담은 로또 인스턴스입니다.
 * @param bonusNumber - 로또의 보너스 숫자입니다.
 */

class WinLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto = {}, bonusNumber = 0) {
    this.#lotto = lotto;
    this.#bonusNumber = bonusNumber;
    this.#validate(bonusNumber);
  }

  #validate() {
    const lottoNumbers = this.#lotto.numbers;
    if (lottoNumbers.includes(this.#bonusNumber)) {
      throw new Error(ERROR_MESSAGE.PREFIX + ERROR_MESSAGE.BONUS_DUPLICATION);
    }
  }

  get winNumbers() {
    return this.#lotto.numbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}

export default WinLotto;
