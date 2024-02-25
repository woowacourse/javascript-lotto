import ERROR_MESSAGE from '../constants/messages/errorMessage';
import LOTTO_RULE from '../constants/rules/lottoRule';

export default class Money {
  #amount;
  #count;

  constructor(amount) {
    this.#amount = Number(amount);
    this.#validateMoney();
    this.#count = amount / LOTTO_RULE.LOTTO_MONEY_UNIT;
  }

  #validateMoney() {
    this.#isPositiveInteger();
    this.#isThousandUnit();
  }

  #isPositiveInteger() {
    if (isNaN(this.#amount) || this.#amount < 1) {
      throw new Error(ERROR_MESSAGE.IS_NOT_POSITIVE_INTEGER);
    }
  }

  #isThousandUnit() {
    if (this.#amount % 1000 !== 0) {
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
