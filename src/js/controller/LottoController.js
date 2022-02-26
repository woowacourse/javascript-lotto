import Lotto from "../model/Lotto.js";
import LottoGameView from "../views/LottoGameView.js";
import { $ } from "../utils/dom.js";
import { SELECTOR, AMOUNT } from "../utils/constants.js";
import { validatePurchaseAmount } from "../utils/validation.js";

export default class LottoController {
  constructor() {
    this.lottoGameModel = new Lotto();
    this.lottoGameView = new LottoGameView();
    this.switchInput = $(SELECTOR.SWITCH_INPUT);
    this.purchaseInput = $(SELECTOR.PURCHASE_INPUT);
    this.lottoNumberList = $(SELECTOR.LOTTO_NUMBER_LIST);
    this.purchaseForm = $(SELECTOR.PURCHASE_FORM);
    this.purchaseForm.addEventListener("submit", this.onSubmitPurchase.bind(this));
    this.switchInput.addEventListener("click", this.onClickSwitch.bind(this));
  }

  handleLottoNumber(lottoCount) {
    this.lottoGameView.disablePurchaseForm();
    this.lottoGameView.enableSwitch(this.switchInput);
    this.lottoGameView.renderPurchaseInfomation(lottoCount);
    this.lottoGameView.renderLottoIcons(lottoCount);
  }

  onSubmitPurchase(e) {
    e.preventDefault();

    const purchaseAmount = Number(this.purchaseInput.value);
    try {
      validatePurchaseAmount(purchaseAmount);
      const lottoCount = Math.floor(purchaseAmount / AMOUNT.UNIT);
      this.lottoGameModel.generateLottoTicket(lottoCount);
      this.handleLottoNumber(lottoCount);
    } catch (error) {
      alert(error);
    }
  }

  onClickSwitch() {
    this.lottoGameView.resetLottoList();

    this.lottoNumberList.classList.toggle("show-numbers");
    if (this.lottoNumberList.classList.contains("show-numbers")) {
      this.lottoGameView.renderLottoNumbers(this.lottoGameModel.getLottoList());
      return;
    }
    this.lottoGameView.renderLottoIcons(this.lottoGameModel.getLottoCount());
  }
}
