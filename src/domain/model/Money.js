const utilFn = require('../../utils');

class Money {
  #amount;

  constructor(amount) {
    this.#validateAmount(amount);
    this.#amount = amount;
  }

  getAmount() {
    return this.#amount;
  }

  #validateAmount(amount) {
    if (amount > 100000 || amount < 1000) {
      throw new Error('[ERROR]');
    }
    if (!utilFn.isNumber(amount)) {
      throw new Error('[ERROR]');
    }

    if (amount % 1000 !== 0) {
      throw new Error('[ERROR]');
    }
  }
}

module.exports = Money;
