import ERROR_MESSAGE from '../constants/messages/errorMessage';

export default class Money {
  #amount;

  constructor(amount) {
    this.#validateMoney(amount);
    this.#amount = amount;
  }

  #validateMoney(amount) {
    this.#isPositiveInteger(amount);
    this.#isThousandUnit(amount);
  }

  #isPositiveInteger(amount) {
    if (isNaN(amount) || amount < 1) {
      throw new Error(ERROR_MESSAGE.IS_NOT_POSITIVE_INTEGER);
    }
  }

  #isThousandUnit(amount) {
    if (amount % 1000 !== 0) {
      throw new Error(ERROR_MESSAGE.IS_NOT_THOUSAND_UNIT);
    }
  }

  get amount() {
    return this.#amount;
  }
}
