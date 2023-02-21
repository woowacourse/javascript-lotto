const { inputValidator } = require('../../utils');
const { ERROR_MESSAGE, LOTTO_NUMBER } = require('../../constant');

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
    if (amount > LOTTO_NUMBER.moneyLimit || amount < LOTTO_NUMBER.moneyUnit) {
      throw new Error(ERROR_MESSAGE.moneyRange);
    }
    if (!inputValidator.isNumber(amount)) {
      throw new Error(ERROR_MESSAGE.number);
    }
    if (amount % LOTTO_NUMBER.moneyUnit !== 0) {
      throw new Error(ERROR_MESSAGE.moneyUnit);
    }
  }
}

module.exports = Money;
