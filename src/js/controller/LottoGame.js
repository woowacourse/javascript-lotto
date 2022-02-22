import { $ } from "../utils/dom.js";
import { ERROR_MESSAGES, SELECTOR } from "../utils/constants.js";
import { isValidMinimumAmount, isValidAmountUnit } from "../utils/validation.js";

export default class LottoGame {
  constructor() {
    this.lottos = [];
  }
  bindEvents() {
    $(SELECTOR.PURCHASE_FORM).addEventListener("submit", this.handlePurchaseSubmit.bind(this));
  }

  handlePurchaseSubmit(e) {
    e.preventDefault();
    const { value } = $(SELECTOR.PURCHASE_INPUT);
    if (!isValidMinimumAmount(Number(value))) {
      alert(ERROR_MESSAGES.INVALID_MINIMUM_AMOUNT);
      return;
    }
    if (!isValidAmountUnit(value)) {
      alert(ERROR_MESSAGES.INVALID_AMOUNT_UNIT);
      return;
    }
  }
}
