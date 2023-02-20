const { inputValidator } = require('../../utils');
const { ERROR_MESSAGE, MAGIC_NUMBER } = require('../../constant');

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
    if (!inputValidator.isNumber(amount)) {
      throw new Error(ERROR_MESSAGE.number);
    }
    if (amount > MAGIC_NUMBER.moneyLimit || amount < MAGIC_NUMBER.moneyUnit) {
      throw new Error(ERROR_MESSAGE.moneyRange);
    }
    if (amount % MAGIC_NUMBER.moneyUnit !== 0) {
      throw new Error(ERROR_MESSAGE.moneyUnit);
    }
  }
}

module.exports = Money;
