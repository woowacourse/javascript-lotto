import { LOTTO } from "../constants/constants.js";
<<<<<<< HEAD
import Lotto from "../domains/Lotto.js";
import validateMoney from "../validations/LottoMachine.js";
export default class LottoMachine {
  #inputMoney = 0;
  #lottos = [];

  get inputMoney() {
    return this.#inputMoney;
  }

  set inputMoney(money) {
    validateMoney(money);
    this.#inputMoney = money;
  }

  get lottos() {
    return this.#lottos;
  }

  get lottoQuantity() {
    return this.#inputMoney / LOTTO.PRICE;
  }

  operateLottoMachine() {
    this.#lottos = this.generateLottos();
    this.#inputMoney = 0;
  }

  generateLottos() {
    return Array(this.lottoQuantity)
      .fill()
      .map(() => {
        const lotto = new Lotto();
        lotto.pickNumbers();
        return lotto;
      });
=======

export default class LottoMachine {
  #inputPrice = 0;

  get inputPrice() {
    return this.#inputPrice;
  }

  set inputPrice(money) {
    this.#inputPrice = money;
  }

  calculateLottoQuantity() {
    return this.#inputPrice / LOTTO.PRICE;
>>>>>>> 0d4f4f9 (refactor: 로또 관련 상수 결합)
  }
}
