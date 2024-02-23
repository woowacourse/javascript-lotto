import { ERROR_MESSAGE } from '../constants/message';

class WinLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    this.#bonusNumber = bonusNumber;
    this.#validate(bonusNumber);
  }

  #validate() {
    const lottoNumbers = this.#lotto.getNumbers();
    if (lottoNumbers.includes(this.#bonusNumber)) {
      throw new Error(ERROR_MESSAGE.PREFIX + ERROR_MESSAGE.BONUS_DUPLICATION);
    }
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}

export default WinLotto;
