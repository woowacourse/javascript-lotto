import messenger from "../Messenger.js";
import { ELEMENT, MESSAGE } from "../Util/constants.js";
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

    this.disableElement(ELEMENT.PURCHASE_AMOUNT_INPUT);
    this.disableElement(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON);
  }

  reset() {
    this.money = 0;
    this.clearPurchaseAmountInput();
    this.ableElement(ELEMENT.PURCHASE_AMOUNT_INPUT);
    this.ableElement(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON);
  }

  clearPurchaseAmountInput() {
    $(ELEMENT.PURCHASE_AMOUNT_INPUT).value = "";
  }

  // TODO : util로 뺄 수 있는지 확인?
  ableElement(element) {
    $(element).disabled = false;
  }

  disableElement(element) {
    $(element).disabled = true;
  }
}

export default PurchaseAmount;
