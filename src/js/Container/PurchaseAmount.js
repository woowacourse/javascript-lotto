import messenger from "../Messenger.js";
import { ELEMENT, MESSAGE } from "../Util/constants.js";
import { ableElement, disableElement, clearInput } from "../Util/DOM.js";
import { $ } from "../Util/querySelector.js";
import { isValidMoney } from "../Util/validator.js";

class PurchaseAmount {
  constructor() {
    $(ELEMENT.PURCHASE_AMOUNT_CONTAINER).addEventListener(
      "submit",
      this.handlePurchaseAmountSubmit.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.RESTART_BUTTON_CLICKED,
      this.reset.bind(this)
    );
  }

  handlePurchaseAmountSubmit(event) {
    event.preventDefault();

    this.money = $(ELEMENT.PURCHASE_AMOUNT_INPUT).value;

    if (!isValidMoney(this.money)) return;

    messenger.dispatchMessage(MESSAGE.MONEY_SUBMITTED, {
      money: this.money,
    });

    disableElement(ELEMENT.PURCHASE_AMOUNT_INPUT);
    disableElement(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON);
  }

  reset() {
    this.money = 0;
    clearInput(ELEMENT.PURCHASE_AMOUNT_INPUT);
    ableElement(ELEMENT.PURCHASE_AMOUNT_INPUT);
    ableElement(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON);
  }
}

export default PurchaseAmount;
