import { LOTTO } from '../constants/constants.js';
import Lotto from '../domains/Lotto.js';
export default class LottoMachine {
  #inputMoney = 0;
  #lottos = [];

  get inputMoney() {
    return this.#inputMoney;
  }

  set inputMoney(money) {
    this.validateMoney(money);
    this.#inputMoney = money;
  }

  get lottos() {
    return this.#lottos;
  }

  set lottos(lottos) {
    this.#lottos = lottos;
  }

  validateMoney(money) {
    if (!this.isValidUnit(money)) {
      throw new Error(`${LOTTO.PRICE}단위로 입력해주세요`);
    }
    if (!this.isOverZero(money)) {
      throw new Error('0원보다 큰 금액을 입력해주세요.');
    }
  }

  isOverZero(money) {
    return money > 0;
  }

  isValidUnit(money) {
    return money % LOTTO.PRICE === 0;
  }

  operateLottoMachine() {
    this.lottos = this.generateLottos();
    this.#inputMoney = 0;
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
