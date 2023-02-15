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

  getWinningMoney() {
    const prize = [0, 2000000000, 30000000, 1500000, 50000, 5000];
    return this.#lottos.reduce((money, lotto) => {
      const rank = this.#winningLotto.calculateRank(lotto);
      return money + prize[rank];
    }, 0);
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
