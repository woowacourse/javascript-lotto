import View from "./View.js";
import { $, setElement } from "../utils/dom.js";
import { validatePurchaseAmount } from "../utils/validation.js";

export default class PurchaseAmountView extends View {
  constructor() {
    super();

    this.purchaseInput = $(".purchase-input");
    this.purchaseButton = $(".purchase-button");
    $(".purchase-form").addEventListener("submit", this.#onSubmitPurchaseAmount.bind(this));
  }

  #onSubmitPurchaseAmount(e) {
    e.preventDefault();

    const purchaseAmount = Number(this.purchaseInput.value);
    try {
      validatePurchaseAmount(purchaseAmount);
      this.handlers.get("submit").forEach((func) => func(purchaseAmount));
      this.manageAmountForm(true);
    } catch (error) {
      alert(error);
    }
  }

  manageAmountForm(isDisable) {
    setElement(this.purchaseInput, isDisable);
    setElement(this.purchaseButton, isDisable);
  }

  resetPurchaseValue() {
    this.purchaseInput.value = "";
  }
}
