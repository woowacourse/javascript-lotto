import validatePurchaseAmount from "../../validations/validatePurchaseAmount.js";
import BaseWebComponent from "../base/BaseWebComponent.js";
import "./lotto-purchase.css";

class LottoPurchase extends BaseWebComponent {
  getTemplate() {
    return `
      <section class="lotto-purchase">
        <h2 class="lotto-purchase__title">🎱 내 번호 당첨 확인 🎱</h2>
        <p class="lotto-purchase__description">구입할 금액을 입력해주세요.</p>
        <form class="lotto-purchase__form">
          <input class="lotto-purchase__input" placeholder="금액" />
          <button class="lotto-purchase__button">구입</button>
        </form>
        <p class="lotto-purchase__error"></p>
      </section>
    `;
  }

  setEvent() {
    const form = this.querySelector(".lotto-purchase__form");
    this.on(
      { target: form, eventType: "submit" },
      this.#handleSubmit.bind(this),
    );
  }

  #handleSubmit(event) {
    event.preventDefault();
    const purchaseAmountInput = this.querySelector(
      ".lotto-purchase__input",
    ).value;
    const errorElement = this.querySelector(".lotto-purchase__error");

    try {
      const purchaseAmount = validatePurchaseAmount(purchaseAmountInput);
      errorElement.style.display = "none";
      this.emit("purchase", { purchaseAmount });
    } catch (error) {
      errorElement.textContent = error.message;
      errorElement.style.display = "block";
    }
  }
}

customElements.define("lotto-purchase", LottoPurchase);
