import { MONEY_ERROR_MESSAGE } from "../constant/message.js";
import { LOTTO } from "../constant/index.js";

class Money {
  #amount;

  constructor(amount) {
    this.#validate(amount);
    this.#amount = amount;
  }

  #validate(amount) {
    this.#validateNumber(amount);
    this.#validateInteger(amount);
    this.#validatePositive(amount);
    this.#validateThousandUnit(amount);
    this.#validateMaxAmount(amount);
  }

  #validateNumber(amount) {
    if (Number.isNaN(amount)) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_NUMBER);
    }
  }
  #validatePositive(amount) {
    if (amount <= 0) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NEGATIVE);
    }
  }

  #validateInteger(amount) {
    if (amount % 1 !== 0) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_INTEGER);
    }
  }

  #validateThousandUnit(amount) {
    if (amount % LOTTO.PRICE !== 0) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_THOUSAND_UNIT);
    }
  }

  #validateMaxAmount(amount) {
    if (amount > LOTTO.MAX_PRICE) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_EXCEED_MAX);
    }
  }

  getMoney() {
    return this.#amount;
  }
}

export default Money;
