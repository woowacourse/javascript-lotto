import LottoShop from "../domain/LottoShop.js";
import { qs } from "../utils/domHelper.js";
import Validator from "../validator/Validator.js";
import Button from "./@common/Button.js";
import Component from "./Component.js";

export default class AmountInput extends Component {
  template() {
    return `
        <header class="main-header title">🎱 내 번호 당첨 확인 🎱</header> 
        <section class="amount-input-section">
          <h2 class="amount-input-section-title body">
            구입할 금액을 입력해주세요
          </h2>
          <article>
          <form class="amount-input-form">
            <input
              type="number"
              class="amount-input placeholder"
              placeholder="금액"
            />
            <div class="amount-input-button-container"></div>
            </form>
          </article>
        </section>`;
  }

  mounted() {
    new Button(qs(".amount-input-button-container"), {
      text: "구입",
      size: "small",
      className: "amount-input-button",
      type: "submit",
      onClick: this.handleButtonClick.bind(this),
    });
  }

  getPurchaseAmount() {
    const amountInput = qs(".amount-input");
    const purchaseAmount = Number(amountInput.value);
    Validator.validatePurchaseAmount(purchaseAmount);

    return purchaseAmount;
  }

  handleButtonClick() {
    try {
      const purchaseAmount = this.getPurchaseAmount();
      const lottoList = LottoShop.purchaseLotto(purchaseAmount);

      this.props.setLottoList({ lottoList });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
}
