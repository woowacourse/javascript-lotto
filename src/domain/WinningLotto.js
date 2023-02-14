import Lotto from "./Lotto.js";

class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(lottoNumber, bonusNumber) {
    super(lottoNumber);
    this.#bonusNumber = bonusNumber;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}

export default WinningLotto;
