import MyComponent from "../abstract/MyComponent.js";
import Money from "../../step1-console/domain/Money.js";
import LottoSeller from "../../step1-console/domain/LottoSeller.js";

import { $ } from "../utils/selector.js";
import { parseNumber } from "../../step1-console/utils/parseNumber.js";

export default class BuyAmountForm extends MyComponent {
  #buyAmountState;
  #lottosState;

  constructor(targetElementId, buyAmountState, lottosState) {
    super(targetElementId);

    this.#buyAmountState = buyAmountState;
    this.#lottosState = lottosState;
  }

  _getTemplate() {
    const buyAmount = this.#buyAmountState.getState();
    const buyAmountTemplate = buyAmount ? `value=${buyAmount}` : "";

    return `
  <section class="getting-buying-amount">
    <p class="buying-amount-message body-text">구입할 금액을 입력해주세요.</p>
    <div class="buying-amount-input-group">
      <input type="number" class="buying-amount-input" placeholder="금액" ${buyAmountTemplate} />
      <button class="buying-amount-button">구입</button>
    </div>
  </section>
`;
  }

  _setEvent() {
    $(".buying-amount-button").addEventListener(
      "click",
      this.#handleBuyLotto.bind(this)
    );
  }

  #handleBuyLotto() {
    const buyAmount = $(".buying-amount-input").value;

    const lottos = this.#buyLottos(buyAmount);

    this.#buyAmountState.setState(buyAmount);
    this.#lottosState.setLottos(lottos);
  }

  #buyLottos(rawBuyAmount) {
    const money = new Money(parseNumber(rawBuyAmount));
    const lottos = LottoSeller.sell(money);

    return lottos;
  }
}
