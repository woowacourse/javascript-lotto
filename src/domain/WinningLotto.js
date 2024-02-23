import { ERROR_MESSAGE } from '../constants/message';
import LottoValidation from '../validation/lottoValidation';

class WinLotto {
  #lotto;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    this.#validate(bonusNumber);
  }

  #validate(bonusNumber) {
    const winNumbers = this.#lotto.getNumbers();
    if (winNumbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.BONUS_DUPLICATION);
    }
  }
}

export default WinLotto;
