import View from "./View.js";
import { $, disableElement } from "../utils/dom.js";
import { validatePurchaseAmount } from "../utils/validation.js";

export default class PurchaseAmountView extends View {
  constructor() {
    super();

    this.purchaseInput = $(".purchase-input");
    $(".purchase-form").addEventListener("submit", this.handlePurchaseAmount.bind(this));
  }

  handlePurchaseAmount(e) {
    e.preventDefault();

    const purchaseAmount = Number(this.purchaseInput.value);
    try {
      validatePurchaseAmount(purchaseAmount);
      this.handlers.get("submit").forEach((func) => func(purchaseAmount));
      disableElement(this.purchaseInput);
      disableElement($(".purchase-button"));
    } catch (error) {
      alert(error);
    }
  }
}
