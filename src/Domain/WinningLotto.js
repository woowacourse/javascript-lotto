import Lotto from './Lotto';
import ERROR_MESSAGE from '../Constants/Messages/errorMessage';
import LOTTO_SETTING from '../Constants/lottoSetting';
import AppError from '../Error/AppError';

class WinningLotto {
  #winningLottoNumbers;

  #bonusNumber;

  setWinLottoNumbers(winLottoNumbers) {
    this.#winningLottoNumbers = new Lotto(winLottoNumbers).getLottoNumbers();
  }

  setBonusNumber(bonusNumber) {
    this.#bonusNumber = bonusNumber;
    this.#validateBonusNumber();
  }

  #validateBonusNumber() {
    this.#validateRange();
    this.#validateDuplicate();
  }

  #validateRange() {
    if (this.#bonusNumber < LOTTO_SETTING.MIN_NUM || this.#bonusNumber > LOTTO_SETTING.MAX_NUM) {
      throw new AppError(ERROR_MESSAGE.OUT_OF_RANGE);
    }
  }

  #validateDuplicate() {
    if (this.#winningLottoNumbers.includes(this.#bonusNumber)) {
      throw new AppError(ERROR_MESSAGE.HAVE_DUPLICATION_OF_LOTTO_NUMBER);
    }
  }

  getWinLottoNumbers() {
    return {
      winningLottoNumbers: this.#winningLottoNumbers,
      bonusNumber: this.#bonusNumber,
    };
  }
}

export default WinningLotto;
