import Lotto from "./Lotto.js";
import Validator from "./Validator.js";

class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(lottoNumber, bonusNumber) {
    super(lottoNumber);
    this.#validateBonusNumber(lottoNumber, bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  #validateBonusNumber(lottoNumber, bonusNumber) {
    Validator.validateBonusNumberRange(bonusNumber);
    Validator.validateBonusNumberDuplicated(lottoNumber, bonusNumber);
  }
}

export default WinningLotto;
