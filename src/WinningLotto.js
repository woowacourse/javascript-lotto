import ERROR_MESSAGE from './constants/errorMessage.js';
import LottoNumber from './LottoNumber.js';

class WinningLotto {
  #winningLotto;
  #bonusNumber;

  constructor(winningLotto, bonusNumber) {
    this.#winningLotto = winningLotto;
    this.validateBonusNumber(bonusNumber);
    this.#bonusNumber = new LottoNumber(bonusNumber);
  }

  validateBonusNumber(bonusNumber) {
    if (this.#winningLotto.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER.DUPLICATE);
    }
  }

}

export default WinningLotto;
