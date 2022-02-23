import Lotto from "../model/Lotto.js";
import LottoResult from "../views/LottoResult.js";
import { $ } from "../utils/dom.js";
import { ERROR_MESSAGES, SELECTOR, AMOUNT_UNIT } from "../utils/constants.js";
import { isValidMinimumAmount, isValidAmountUnit } from "../utils/validation.js";

export default class LottoGame {
  constructor() {
    this.lottos = [];
    this.view = new LottoResult();
  }
  bindEvents() {
    $(SELECTOR.PURCHASE_FORM).addEventListener("submit", this.onSubmitPurchase.bind(this));
  }

  onSubmitPurchase(e) {
    e.preventDefault();

    const { value } = $(SELECTOR.PURCHASE_INPUT);
    if (!isValidMinimumAmount(Number(value))) {
      alert(ERROR_MESSAGES.INVALID_MINIMUM_AMOUNT);
      return;
    }
    if (!isValidAmountUnit(Number(value))) {
      alert(ERROR_MESSAGES.INVALID_AMOUNT_UNIT);
      return;
    }
    const lottoTicketCount = Math.floor(value / AMOUNT_UNIT);
    this.makeLottoTicket(lottoTicketCount);
    this.view.renderPurchaseInfomation(lottoTicketCount);
    this.view.renderLottoIcons(lottoTicketCount);
  }

  makeLottoTicket(count) {
    for (let i = 0; i < count; i += 1) {
      const lotto = new Lotto();
      lotto.makeRandomNumber();
      this.lottos.push(lotto);
    }
  }
}
