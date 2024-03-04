import { ERROR_MESSAGE } from '../../constants/messages/errorMessage';
import LOTTO_RULE from '../../constants/rules/lottoRule';

export default class Money {
  #amount;
  #count;

  /**
   *
   * @param {string} amount
   */
  constructor(amount) {
    this.#amount = Number(amount);
    this.#validateMoney();
    this.#count = amount / LOTTO_RULE.LOTTO_MONEY_UNIT;
  }

  #validateMoney() {
    this.#isPositiveInteger();
    this.#isThousandUnit();
    this.#overMaxValue();
  }

  #isPositiveInteger() {
    if (isNaN(this.#amount) || this.#amount < 1) {
      throw new Error(ERROR_MESSAGE.IS_NOT_POSITIVE_INTEGER);
    }
  }

  #isThousandUnit() {
    if (this.#amount % LOTTO_RULE.LOTTO_MONEY_UNIT !== 0) {
      throw new Error(ERROR_MESSAGE.IS_NOT_THOUSAND_UNIT);
    }
  }

  #overMaxValue() {
    if (this.#amount > 100000) {
      throw new Error(ERROR_MESSAGE.OVER_MAX_VALUE);
    }
  }

  get amount() {
    return this.#amount;
  }

  get count() {
    return this.#count;
  }
}
