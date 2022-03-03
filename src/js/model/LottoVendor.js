import LOTTO from '../constants/lotto.js';
import repeatCallback from '../utils/repeat.js';
import validateMoney from '../validator/moneyValidator.js';
import Lotto from './Lotto.js';

export default class LottoVendor {
  #paidMoney = 0;

  #lottos = [];

  set paidMoney(money) {
    if (validateMoney(money)) {
      this.#paidMoney = money;
    }
  }

  get paidMoney() {
    return this.#paidMoney;
  }

  set lottos(numbers) {
    this.#lottos = numbers;
  }

  get lottos() {
    return this.#lottos;
  }

  createLottos() {
    const count = Math.floor(this.#paidMoney / LOTTO.PRICE_PER_TICKET);
    repeatCallback(count, () => this.#lottos.push(new Lotto()));
  }

  countTicket() {
    return Math.floor(this.#paidMoney / LOTTO.PRICE_PER_TICKET);
  }

  static settleMoney(money) {
    return Math.floor(money / LOTTO.PRICE_PER_TICKET) * LOTTO.PRICE_PER_TICKET;
  }
}
