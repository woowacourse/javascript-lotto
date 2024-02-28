import MyComponent from "../abstract/MyComponent.js";
import Money from "../../step1-console/domain/Money.js";
import LottoSeller from "../../step1-console/domain/LottoSeller.js";

import { $ } from "../utils/selector.js";
import { parseNumber } from "../../step1-console/utils/parseNumber.js";

export default class BuyAmountForm extends MyComponent {
  #lottosState;

  constructor(targetElementId, lottosState) {
    super(targetElementId);

    this.#lottosState = lottosState;
  }

  _getTemplate() {
    return `
  <section class="getting-buying-amount">
    <p class="buying-amount-message body-text">구입할 금액을 입력해주세요.</p>
    <div class="buying-amount-input-group">
      <input type="number" class="buying-amount-input" placeholder="금액" />
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
    const buyingAmount = $(".buying-amount-input").value;

    const lottos = this.#buyLottos(buyingAmount);

    this.#lottosState.setLottos(lottos);
  }

  #buyLottos(rawBuyAmount) {
    const money = new Money(parseNumber(rawBuyAmount));
    const lottos = LottoSeller.sell(money);

    return lottos;
  }
}
