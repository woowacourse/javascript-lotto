import LOTTO from '../constants/lotto.js';
import repeatCallback from '../utils/repeat.js';
import validateMoney from '../validator/moneyValidator.js';
import Lotto from './Lotto.js';

export default class LottoBundle {
  #purchaseMoney = 0;

  #count = 0;

  #lottos = [];

  set purchaseMoney(money) {
    if (validateMoney(money)) {
      this.#purchaseMoney = Math.floor(money / LOTTO.PRICE_PER_TICKET) * LOTTO.PRICE_PER_TICKET;
    }
  }

  get purchaseMoney() {
    return this.#purchaseMoney;
  }

  saveCount() {
    this.#count = Math.floor(this.#purchaseMoney / LOTTO.PRICE_PER_TICKET);
  }

  get count() {
    return this.#count;
  }

  set lottos(numbers) {
    this.#lottos = numbers;
  }

  get lottos() {
    return this.#lottos;
  }

  isLottoListEmpty() {
    if (this.#lottos.length === 0) {
      return true;
    }
    return false;
  }

  createLottoBundle() {
    repeatCallback(this.#count, () => this.#pushLottoToBundle());
  }

  #pushLottoToBundle() {
    const lotto = new Lotto();
    this.#lottos.push(lotto);
  }

  reset() {
    this.#purchaseMoney = 0;
    this.#count = 0;
    this.#lottos = [];
  }
}
