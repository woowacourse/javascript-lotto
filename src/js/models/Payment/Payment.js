import { LOTTO } from '../../configs/contants.js';

export default class Payment {
  constructor(amount) {
    this.amount = amount;
  }

  getNumberOfLotto() {
    return parseInt(this.amount / LOTTO.PRICE, 10);
  }
}
