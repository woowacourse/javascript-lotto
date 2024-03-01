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
  }https://github.com/woowacourse/javascript-lotto/pull/296/conflict?name=src%252FConstants%252Fretry.js&base_oid=7eee17672796f4f39fbf17e79e89c32859944e14&head_oid=392e7a93c92abd3367f140312b5a44b996f3a4c5

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
