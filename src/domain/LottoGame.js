import Validator from "./Validator.js";
import Lotto from "./Lotto.js";
import getRandomNumberArray from "../utils/getRandomNumberArray.js";
import WinningLotto from "./WinningLotto.js";

class LottoGame {
  #lottos = [];
  #winningLotto;

  purchaseLottos(money) {
    this.#validateMoneyInput(money);
    const lottoAmount = this.#getLottoAmount(money);
    const lottos = this.#getLottos(lottoAmount);
    this.#lottos = lottos;
  }

  generateWinningLotto(lottoNumber, bonusNumber) {
    this.#winningLotto = new WinningLotto(lottoNumber, bonusNumber);
  }

  #validateMoneyInput(money) {
    Validator.validateNumberType(money);
    Validator.validateExactUnit(money, 1000);
  }

  #getLottoAmount(money) {
    return money / 1000;
  }

  #getLottos(lottoAmount) {
    return Array.from(
      { length: lottoAmount },
      () => new Lotto(getRandomNumberArray(6))
    );
  }

  getLottos() {
    return [...this.#lottos];
  }
}

export default LottoGame;
