import { MAX_AMOUNT, MIN_UNIT } from "../../constants/constants.js";
import BaseWebComponent from "../base/BaseWebComponent.js";
import "./lotto-purchase.css";

class LottoPurchase extends BaseWebComponent {
  getTemplate() {
    return `
      <section class="lotto-purchase">
        <h2 class="lotto-purchase__title">🎱 내 번호 당첨 확인 🎱</h2>
        <p class="lotto-purchase__description">구입할 금액을 입력해주세요.</p>
        <form class="lotto-purchase__form">
          <input
            class="lotto-purchase__input"
            type="number"
            placeholder="금액"
            min="${MIN_UNIT}"
            max="${MAX_AMOUNT}"
            step="${MIN_UNIT}"
            required
          />
          <button class="lotto-purchase__button">구입</button>
        </form>
      </section>
    `;
  }
}

customElements.define("lotto-purchase", LottoPurchase);
