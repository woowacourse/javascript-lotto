import { LOTTO } from "../constants/constants.js";
import Lotto from "../domains/Lotto.js";
export default class LottoMachine {
  #inputMoney = 0;
  #lottos = [];

  get inputMoney() {
    return this.#inputMoney;
  }

  set inputMoney(money) {
    this.#inputMoney = money;
  }

  get lottos() {
    return this.#lottos;
  }

  set lottos(lottos) {
    this.#lottos = lottos;
  }

  operateLottoMachine() {
    this.lottos = this.generateLottos();
    this.inputMoney = 0;
  }

  generateLottos() {
    return Array(this.calculateLottoQuantity())
      .fill()
      .map(() => {
        const lotto = new Lotto();
        lotto.numbers = lotto.generateNumbers(lotto.generateRandomNumber);
        return lotto;
      });
  }

  calculateLottoQuantity() {
    return this.#inputMoney / LOTTO.PRICE;
  }
}
