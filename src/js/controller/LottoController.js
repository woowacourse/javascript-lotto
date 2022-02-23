import LottoGame from "../model/LottoGame.js";
import LottoGameView from "../views/LottoGameView.js";
import { $ } from "../utils/dom.js";
import { ERROR_MESSAGES, SELECTOR, AMOUNT_UNIT } from "../utils/constants.js";
import { isValidMinimumAmount, isValidAmountUnit } from "../utils/validation.js";

export default class LottoController {
  constructor() {
    this.lottoGameModel = new LottoGame();
    this.lottoGameView = new LottoGameView();
    this.switchInput = $(SELECTOR.SWITCH_INPUT);
    this.purchaseInput = $(SELECTOR.PURCHASE_INPUT);
  }

  bindEvents() {
    $(SELECTOR.PURCHASE_FORM).addEventListener("submit", this.onSubmitPurchase.bind(this));
    this.switchInput.addEventListener("click", this.onClickSwitch.bind(this));
  }

  handleLottoNumber(lottoCount) {
    this.lottoGameView.disablePurchaseForm();
    this.lottoGameView.enableSwitch();
    this.lottoGameView.renderPurchaseInfomation(lottoCount);
    this.lottoGameView.renderLottoIcons(lottoCount);
  }

  onSubmitPurchase(e) {
    e.preventDefault();

    const { value } = this.purchaseInput;
    if (!isValidMinimumAmount(Number(value))) {
      alert(ERROR_MESSAGES.INVALID_MINIMUM_AMOUNT);
      return;
    }
    if (!isValidAmountUnit(Number(value))) {
      alert(ERROR_MESSAGES.INVALID_AMOUNT_UNIT);
      return;
    }
    const lottoCount = Math.floor(value / AMOUNT_UNIT);
    this.lottoGameModel.generateLottoTicket(lottoCount);
    this.handleLottoNumber(lottoCount);
  }

  onClickSwitch() {
    this.lottoGameView.resetLottoList();

    this.switchInput.classList.toggle("lotto-number");
    if (this.switchInput.classList.contains("lotto-number")) {
      this.lottoGameView.renderLottoNumbers(this.lottoGameModel.getLottoList());
      return;
    }
    this.lottoGameView.renderLottoIcons(this.lottoGameModel.getLottoCount());
  }
}
