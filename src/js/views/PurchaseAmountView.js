import View from "./View.js";
import { $, disableElement, enableElement } from "../utils/dom.js";
import { validatePurchaseAmount } from "../utils/validation.js";

export default class PurchaseAmountView extends View {
  constructor() {
    super();

    this.purchaseInput = $(".purchase-input");
    this.purchaseButton = $(".purchase-button");
    $(".purchase-form").addEventListener("submit", this.onSubmitPurchaseAmount.bind(this));
  }

  onSubmitPurchaseAmount(e) {
    e.preventDefault();

    const purchaseAmount = Number(this.purchaseInput.value);
    try {
      validatePurchaseAmount(purchaseAmount);
      this.handlers.get("submit").forEach((func) => func(purchaseAmount));
      this.disableForm();
    } catch (error) {
      alert(error);
    }
  }

  disableForm() {
    disableElement(this.purchaseInput);
    disableElement(this.purchaseButton);
  }

  enableForm() {
    enableElement(this.purchaseInput);
    enableElement(this.purchaseButton);
  }

  resetPurchaseValue() {
    this.purchaseInput.value = "";
  }
}
