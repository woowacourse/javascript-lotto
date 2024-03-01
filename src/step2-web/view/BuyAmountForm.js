import Component from "../abstract/Component.js";
import Money from "../../step1-console/domain/Money.js";
import LottoSeller from "../../step1-console/domain/LottoSeller.js";

import { $ } from "../utils/selector.js";
import { parseNumber } from "../../step1-console/utils/parseNumber.js";

export default class BuyAmountForm extends Component {
  #lottosState;
  #buyAmountFormState;

  constructor(targetElementId, buyAmountFormState, lottosState) {
    super(targetElementId);

    this.#buyAmountFormState = buyAmountFormState;
    this.#lottosState = lottosState;
  }

  _getTemplate() {
    const { buyAmount, errorMessage } = this.#buyAmountFormState.getState();

    const buyAmountValueTemplate = buyAmount ? `value=${buyAmount}` : "";

    return `
  <section class="getting-buying-amount">
    <p class="buying-amount-message body-text">구입할 금액을 입력해주세요.</p>
    <div class="buying-amount-input-group">
      <input type="number" class="buying-amount-input" placeholder="금액" ${buyAmountValueTemplate} />
      <button class="buying-amount-button">구입</button>
    </div>
    <div id="buying-amount-error-message" class="error-message">${
      errorMessage || ""
    }</>
  </section>
`;
  }

  _setEvent() {
    const buyingAmountClickHandler = this._attachErrorHandler(
      this.#handleBuyLotto.bind(this),
      (message) => this.#buyAmountFormState.setState({ errorMessage: message })
    );

    $(".buying-amount-button").addEventListener(
      "click",
      buyingAmountClickHandler
    );
  }

  #handleBuyLotto() {
    const buyAmount = $(".buying-amount-input").value;

    const lottos = this.#buyLottos(buyAmount);

    this.#buyAmountFormState.setState({ buyAmount: null, errorMessage: null });
    this.#lottosState.setState(lottos);
  }

  #buyLottos(rawBuyAmount) {
    const money = new Money(parseNumber(rawBuyAmount));
    const lottos = LottoSeller.sell(money);

    return lottos;
  }
}
