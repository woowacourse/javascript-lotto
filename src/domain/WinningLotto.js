import Lotto from "./Lotto.js";
import Validator from "./Validator.js";
import getSameElementCount from "../utils/getSameElementCount.js";
import isExistData from "../utils/isExistData.js";

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

  calculateRank(lotto) {
    const sameElementCount = getSameElementCount(
      this.getLottoNumber(),
      lotto.getLottoNumber()
    );
    if (sameElementCount === 6) return 1;
    if (
      sameElementCount === 5 &&
      isExistData(this.#bonusNumber, lotto.getLottoNumber())
    )
      return 2;
    if (sameElementCount === 5) return 3;
    if (sameElementCount === 4) return 4;
    if (sameElementCount === 3) return 5;
    return 0;
  }

  #validateBonusNumber(lottoNumber, bonusNumber) {
    Validator.validateBonusNumberRange(bonusNumber);
    Validator.validateBonusNumberDuplicated(lottoNumber, bonusNumber);
  }
}

export default WinningLotto;
