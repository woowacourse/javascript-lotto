import ERROR_MESSAGE from '../constants/messages/errorMessage';
import LOTTO_RULE from '../constants/rules/lottoRule';

export default class Money {
  #amount;

  #count;

  constructor(amount) {
    this.#validateMoney(amount);
    this.#amount = amount;
    this.#count = amount / LOTTO_RULE.LOTTO_MONEY_UNIT;
  }

  #validateMoney(amount) {
    this.#isNumber(amount);
    this.#isPositiveInteger(amount);
    this.#isThousandUnit(amount);
  }

  #isNumber(amount) {
    if (Number.isNaN(amount)) {
      throw new Error(ERROR_MESSAGE.IS_NOT_POSITIVE_INTEGER);
    }
  }

  #isPositiveInteger(amount) {
    if (amount < 1) {
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

  get count() {
    return this.#count;
  }
}
