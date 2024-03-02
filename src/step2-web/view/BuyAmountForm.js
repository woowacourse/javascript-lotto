import Component from "../abstract/Component.js";
import Money from "../../step1-console/domain/Money.js";
import LottoSeller from "../../step1-console/domain/LottoSeller.js";

import { $ } from "../utils/selector.js";
import { parseNumber } from "../../step1-console/utils/parseNumber.js";

const BUY_AMOUNT_INPUT_ID = "buy-amount-input";
const BUY_AMOUNT_ERROR_MESSAGE_ID = "buy-amount-error-message";
const BUY_AMOUNT_BUTTON_ID = "buy-amount-button";
export default class BuyAmountForm extends Component {
  #lottosState;

  constructor(targetElementId, lottosState) {
    super(targetElementId);

    this.#lottosState = lottosState;
  }

  _getTemplate() {
    return `
  <section class="getting-buy-amount">
    <p class="buy-amount-message body-text">구입할 금액을 입력해주세요.</p>
    <form class="buy-amount-form" onsubmit="return false;">
        <input type="number" id=${BUY_AMOUNT_INPUT_ID} class="buy-amount-input" placeholder="금액" />
        <button id="${BUY_AMOUNT_BUTTON_ID}" class="buy-amount-button">구입</button>
    </form>
    <p id=${BUY_AMOUNT_ERROR_MESSAGE_ID} class="error-message"></p>
  </section>
`;
  }

  _setEvent() {
    const buyingAmountClickHandler = this._attachErrorHandler(
      this.#handleBuyLotto.bind(this),
      BUY_AMOUNT_ERROR_MESSAGE_ID
    );

    $(`#${BUY_AMOUNT_BUTTON_ID}`).addEventListener(
      "click",
      buyingAmountClickHandler
    );
  }

  #handleBuyLotto() {
    const buyAmount = $(`#${BUY_AMOUNT_INPUT_ID}`).value;

    const lottos = this.#buyLottos(buyAmount);

    this.#resetErrorMessage();
    this.#resetInput();
    this.#lottosState.setState(lottos);
  }

  #buyLottos(rawBuyAmount) {
    const money = new Money(parseNumber(rawBuyAmount));
    const lottos = LottoSeller.sell(money);

    return lottos;
  }

  #resetErrorMessage() {
    $(`#${BUY_AMOUNT_ERROR_MESSAGE_ID}`).textContent = "";
  }

  #resetInput() {
    $(`#${BUY_AMOUNT_INPUT_ID}`).value = "";
  }
}
