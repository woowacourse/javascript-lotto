import { ERROR_MESSAGE } from '../constants/message';

class WinLotto {
  #lotto;
  #winNumbers;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    this.#winNumbers = lotto.getNumbers();
    this.#bonusNumber = bonusNumber;
    this.#validate(bonusNumber);
  }

  #validate() {
    const lottoNumbers = this.#lotto.getNumbers();
    if (lottoNumbers.includes(this.#bonusNumber)) {
      throw new Error(ERROR_MESSAGE.PREFIX + ERROR_MESSAGE.BONUS_DUPLICATION);
    }
  }

  get winNumbers() {
    return this.#winNumbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}

export default WinLotto;
