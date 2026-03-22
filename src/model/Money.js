import { MONEY_ERROR_MESSAGE } from "../constant/message.js";
import { LOTTO } from "../constant/index.js";

class Money {
  #amount;

  constructor(amount) {
    this.#amount = amount;
    this.#validate(amount);
  }

  #validate(amount) {
    this.#validateNumber(amount);
    this.#validatePositiveInteger(amount);
    this.#validateThousandUnit(amount);
  }

  #validateNumber(amount) {
    if (typeof amount !== 'number' || Number.isNaN(amount)) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_NUMBER);
    }
  }

  #validatePositiveInteger(amount) {
    if (amount % 1 !== 0 || amount <= 0) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_INTEGER);
    }
  }

  #validateThousandUnit(amount) {
    if (amount % LOTTO.PRICE !== 0) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_THOUSAND_UNIT);
    }
  }

  getMoney() {
    return this.#amount;
  }
}

export default Money;
