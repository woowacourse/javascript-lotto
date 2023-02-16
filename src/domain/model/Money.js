const { MAGIC_NUMBER } = require('../../constant');
const { inputValidator } = require('../../utils');

class Money {
  #amount;

  constructor(amount) {
    this.#validateAmount(Number(amount));
    this.#amount = amount;
  }

  getAmount() {
    return this.#amount;
  }

  #validateAmount(amount) {
    if (amount > MAGIC_NUMBER.moneyLimit || amount < MAGIC_NUMBER.moneyUnit) {
      throw new Error('[ERROR]');
    }
    if (!inputValidator.isNumber(amount)) {
      throw new Error('[ERROR]');
    }
    if (amount % MAGIC_NUMBER.moneyUnit !== 0) {
      throw new Error('[ERROR]');
    }
  }
}

module.exports = Money;
