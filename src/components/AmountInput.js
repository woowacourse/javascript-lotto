import LottoShop from "../domain/LottoShop.js";
import { qs } from "../utils/domHelper.js";
import Validator from "../validator/Validator.js";
import Component from "./Component.js";

export default class AmountInput extends Component {
  setEvent() {
    this.addEvent(
      "click",
      ".amount-input-button",
      this.handleButtonClick.bind(this)
    );
  }

  template() {
    return `
        <header class="main-header title">🎱 내 번호 당첨 확인 🎱</header> 
        <section class="amount-input-section">
          <h2 class="amount-input-section-title body">
            구입할 금액을 입력해주세요
          </h2>
          <article class="amount-input-article">
            <input
              type="number"
              class="amount-input placeholder"
              placeholder="금액"
            />
            <button class="amount-input-button lotto-caption">구입</button>
          </article>
        </section>`;
  }

  handleButtonClick() {
    const amountInput = qs(".amount-input");
    const purchaseAmount = Number(amountInput.value);
    const lottoList = LottoShop.purchaseLotto(purchaseAmount);

    Validator.validatePurchaseAmount(purchaseAmount);
    this.props.setLottoList({ lottoList });
  }
}
