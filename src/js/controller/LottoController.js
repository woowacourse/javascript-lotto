import LottoGame from "../model/LottoGame.js";
import LottoResult from "../views/LottoResult.js";
import { $ } from "../utils/dom.js";
import { ERROR_MESSAGES, SELECTOR, AMOUNT_UNIT } from "../utils/constants.js";
import { isValidMinimumAmount, isValidAmountUnit } from "../utils/validation.js";

export default class LottoController {
  constructor() {
    this.model = new LottoGame();
    this.view = new LottoResult();
    this.switchInput = $(SELECTOR.SWITCH_INPUT);
  }

  bindEvents() {
    $(SELECTOR.PURCHASE_FORM).addEventListener("submit", this.onSubmitPurchase.bind(this));
    this.switchInput.addEventListener("click", this.onClickSwitch.bind(this));
  }

  showLottoNumber() {
    const count = this.model.getLottosLength();
    this.view.renderPurchaseInfomation(count);
    this.view.renderLottoIcons(count);
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
    const lottoCount = Math.floor(value / AMOUNT_UNIT);
    this.model.makeLottoTicket(lottoCount);
    this.showLottoNumber();
  }

  onClickSwitch() {
    this.view.resetLottoList();
    this.switchInput.classList.toggle("lotto-number");
    if (this.switchInput.classList.contains("lotto-number")) {
      this.view.renderLottoNumbers(this.model.getLottoList());
      return;
    }
    this.view.renderLottoIcons(this.model.getLottosLength());
  }
}
