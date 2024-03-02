import Lotto from './Lotto.js';
import ERROR_MESSAGE from '../Constants/Messages/errorMessage.js';
import LOTTO_SETTING from '../Constants/lottoSetting.js';
import AppError from '../Error/AppError.js';

class WinningLotto {
  #winningLottoNumbers;

  #bonusNumber;

  setWinLottoNumbers(winLottoNumbers) {
    this.#winningLottoNumbers = new Lotto(winLottoNumbers).getLottoNumbers();
  }

  setBonusNumber(bonusNumber) {
    this.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #validateBonusNumber(bonusNumber) {
    this.#validateRange(bonusNumber);
    this.#validateDuplicate(bonusNumber);
  }

  #validateRange(bonusNumber) {
    if (bonusNumber < LOTTO_SETTING.MIN_NUM || bonusNumber > LOTTO_SETTING.MAX_NUM) {
      throw new AppError(ERROR_MESSAGE.OUT_OF_RANGE);
    }
  }

  #validateDuplicate(bonusNumber) {
    if (this.#winningLottoNumbers.includes(bonusNumber)) {
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
