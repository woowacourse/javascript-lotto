import Validation from '../Validation';

class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    Validation.validateLottoNumber(bonusNumber);
    Validation.validateBonusNumberDistinct(this.getLottoNumbers(), bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  getLottoNumbers() {
    return this.#lotto.getLottoNumbers();
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}

export default WinningLotto;
