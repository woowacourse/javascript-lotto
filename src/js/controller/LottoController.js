import LottoGame from "../model/LottoGame.js";
import LottoResult from "../views/LottoResult.js";
import { $ } from "../utils/dom.js";
import { ERROR_MESSAGES, SELECTOR, AMOUNT_UNIT } from "../utils/constants.js";
import { isValidMinimumAmount, isValidAmountUnit } from "../utils/validation.js";

export default class LottoController {
  constructor() {
    this.lottoGameModel = new LottoGame();
    this.lottoResultView = new LottoResult();
    this.switchInput = $(SELECTOR.SWITCH_INPUT);
  }

  bindEvents() {
    $(SELECTOR.PURCHASE_FORM).addEventListener("submit", this.onSubmitPurchase.bind(this));
    this.switchInput.addEventListener("click", this.onClickSwitch.bind(this));
  }

  showLottoNumber() {
    const lottoTicketCount = this.lottoGameModel.getLottoCount();
    this.lottoResultView.renderPurchaseInfomation(lottoTicketCount);
    this.lottoResultView.renderLottoIcons(lottoTicketCount);
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
    this.lottoGameModel.makeLottoTicket(lottoCount);
    this.showLottoNumber();
  }

  onClickSwitch() {
    this.lottoResultView.resetLottoList();

    this.switchInput.classList.toggle("lotto-number");
    if (this.switchInput.classList.contains("lotto-number")) {
      this.lottoResultView.renderLottoNumbers(this.lottoGameModel.getLottoList());
      return;
    }
    this.lottoResultView.renderLottoIcons(this.lottoGameModel.getLottoCount());
  }
}
