import Lotto from "../model/Lotto.js";
import LottoResult from "../views/LottoResult.js";
import { $ } from "../utils/dom.js";
import { ERROR_MESSAGES, SELECTOR, AMOUNT_UNIT } from "../utils/constants.js";
import { isValidMinimumAmount, isValidAmountUnit } from "../utils/validation.js";

export default class LottoGame {
  constructor() {
    this.lottos = [];
    this.lottoCount = 0;
    this.view = new LottoResult();
    this.switchInput = $(SELECTOR.SWITCH_INPUT);
  }

  bindEvents() {
    $(SELECTOR.PURCHASE_FORM).addEventListener("submit", this.onSubmitPurchase.bind(this));
    this.switchInput.addEventListener("click", this.onClickSwitch.bind(this));
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
    this.lottoCount = Math.floor(value / AMOUNT_UNIT);
    this.makeLottoTicket();
    this.showLottoNumber();
  }

  showLottoNumber() {
    this.view.renderPurchaseInfomation(this.lottoCount);
    this.view.renderLottoIcons(this.lottoCount);
  }

  makeLottoTicket() {
    for (let i = 0; i < this.lottoCount; i += 1) {
      const lotto = new Lotto();
      lotto.makeRandomNumber();
      this.lottos.push(lotto);
    }
  }

  onClickSwitch() {
    this.view.resetLottoList();
    this.switchInput.classList.toggle("toggle");
    if (this.switchInput.classList.contains("toggle")) {
      this.view.renderLottoNumbers(this.lottos);
      return;
    }
    this.view.renderLottoIcons(this.lottos.length);
  }
}
