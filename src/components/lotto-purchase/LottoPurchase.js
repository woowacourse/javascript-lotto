import { $, hideElement, renderElement } from "../../utils/domUtils.js";
import validatePurchaseAmount from "../../validations/validatePurchaseAmount.js";
import BaseWebComponent from "../base/BaseWebComponent.js";
import "./lotto-purchase.css";

class LottoPurchase extends BaseWebComponent {
  getTemplate() {
    return `
      <section class="lotto-purchase">
        <h2 class="lotto-purchase__title">🎱 내 번호 당첨 확인 🎱</h2>
        <label for="purchase-amount" class="lotto-purchase__description">구입할 금액을 입력해주세요.</label>
        <form class="lotto-purchase__form">
          <input id="purchase-amount" class="lotto-purchase__input" placeholder="금액" />
          <button class="lotto-purchase__button">구입</button>
        </form>
        <p class="lotto-purchase__error hidden"></p>
      </section>
    `;
  }

  setEvent() {
    const form = $(".lotto-purchase__form", this);
    this.on(
      { target: form, eventType: "submit" },
      this.#handleSubmit.bind(this),
    );
  }

  #handleSubmit(event) {
    event.preventDefault();
    const purchaseAmountInput = $(".lotto-purchase__input", this).value;
    const errorElement = $(".lotto-purchase__error", this);

    this.#handleValidation(purchaseAmountInput, errorElement);
  }

  #handleValidation(purchaseAmountInput, errorElement) {
    try {
      const purchaseAmount = validatePurchaseAmount(purchaseAmountInput);
      hideElement(errorElement);
      this.emit("purchase", { purchaseAmount });
    } catch (error) {
      errorElement.textContent = error.message;
      renderElement(errorElement);
    }
  }
}

customElements.define("lotto-purchase", LottoPurchase);
