import { INPUT_MESSAGES } from "../lib/constants.js";
import LottoPurchase from "../service/LottoPurchase.js";
import { qs } from "../../utils/domHelper.js";
import Button from "./@common/Button.js";
import Component from "../core/Component.js";
import Validator from "../validator/Validator.js";

export default class AmountInput extends Component {
  constructor(element, props) {
    super(element, props);
    this.lottoPurchase = new LottoPurchase(this.props.setLottoList);
  }
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
              autofocus
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
      onClick: this.handleFormSubmit.bind(this),
    });
  }

  getPurchaseAmount() {
    const amountInput = qs(".amount-input");
    const purchaseAmount = Number(amountInput.value);
    Validator.validatePurchaseAmount(purchaseAmount);

    return purchaseAmount;
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.handleButtonClick();
  }

  handleButtonClick() {
    try {
      const purchaseAmount = this.getPurchaseAmount();
      const hasLottoList = this.props.state.lottoList.length === undefined;

      if (hasLottoList && !confirm(INPUT_MESSAGES.alreadyPurchased())) {
        return;
      }

      this.lottoPurchase.purchaseLotto(purchaseAmount);
    } catch (error) {
      this.clearInput();
      console.error(error);
      alert(error.message);
    }
  }

  clearInput() {
    const input = qs(".amount-input");
    input.value = "";
  }
}
