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

  get count() {
    return this.#count;
  }
}
