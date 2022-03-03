import LOTTO from '../constants/lotto.js';
import repeatCallback from '../utils/repeat.js';
import validateMoney from '../validator/moneyValidator.js';
import Lotto from './Lotto.js';

export default class LottoVendor {
  #paidMoney = 0;

  #count = 0;

  #lottos = [];

  set paidMoney(money) {
    if (validateMoney(money)) {
      this.#paidMoney = Math.floor(money / LOTTO.PRICE_PER_TICKET) * LOTTO.PRICE_PER_TICKET;
    }
  }

  get paidMoney() {
    return this.#paidMoney;
  }

  saveCount() {
    this.#count = Math.floor(this.#paidMoney / LOTTO.PRICE_PER_TICKET);
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
    return this.#lottos.length === 0;
  }

  createLottoBundle() {
    repeatCallback(this.#count, () => this.#pushLottoToBundle());
  }

  #pushLottoToBundle() {
    const lotto = new Lotto();
    this.#lottos.push(lotto);
  }

  reset() {
    this.#paidMoney = 0;
    this.#count = 0;
    this.#lottos = [];
  }
}
