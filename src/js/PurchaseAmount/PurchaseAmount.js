import messenger from "../Messenger.js";
import { ELEMENT, MESSAGE } from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";
import { isValidMoney } from "../Util/validator.js";

class PurchaseAmount {
  constructor() {
    this.$purchaseAmountContainer = $(ELEMENT.PURCHASE_AMOUNT_CONTAINER);

    this.$purchaseAmountContainer.addEventListener(
      "submit",
      this.handlePurchaseAmountSubmit.bind(this)
    );
  }

  handlePurchaseAmountSubmit(event) {
    event.preventDefault();

    this.money = $(ELEMENT.PURCHASE_AMOUNT_INPUT).value;

    if (!isValidMoney(this.money)) {
      this.clearPurchaseAmountInput();
      return;
    }

    messenger.dispatchMessage(MESSAGE.MONEY_SUBMITTED, {
      money: this.money,
    });

    this.disableElement(ELEMENT.PURCHASE_AMOUNT_INPUT);
    this.disableElement(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON);
  }

  clearPurchaseAmountInput() {
    $(ELEMENT.PURCHASE_AMOUNT_INPUT).value = "";
    $(ELEMENT.PURCHASE_AMOUNT_INPUT).focus();
  }

  disableElement = (element) => {
    $(element).disabled = true;
  };
}

export default PurchaseAmount;
