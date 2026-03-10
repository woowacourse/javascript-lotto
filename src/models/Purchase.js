import { LOTTO_COST } from "../constants/config.js";
import { ERROR_MESSAGE } from "../constants/message.js";

import { isInputEmpty, isPositiveInteger } from "../validates/CommonValidator.js";
import { isValidUnit, isTooLarge } from "../validates/PurchaseValidator.js";

class Purchase {
  #money;

  constructor(moneyInput) {
    this.#validate(moneyInput);
    this.#money = Number(moneyInput);
  }

  #validate(input) {
    if (isInputEmpty(input)) {
      throw new Error(ERROR_MESSAGE.COMMON.INVALID_NUMBER);
    }

    if (!isPositiveInteger(input)) {
      throw new Error(ERROR_MESSAGE.COMMON.INVALID_NUMBER);
    }

    if (isTooLarge(input)) {
      throw new Error(ERROR_MESSAGE.PURCHASE.TOO_LARGE);
    }

    if (!isValidUnit(input)) {
      throw new Error(ERROR_MESSAGE.PURCHASE.INVALID_UNIT);
    }
  }

  getLottoTicketCount() {
    return this.#money / LOTTO_COST;
  }
}

export default Purchase;
