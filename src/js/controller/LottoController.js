import LottoGameModel from "../model/LottoGameModel.js";
import LottoListView from "../views/LottoListView.js";
import ModalView from "../views/ModalView.js";
import PurchaseView from "../views/PurchaseView.js";
import WinningNumberView from "../views/WinningNumberView.js";

import { $, $$ } from "../utils/dom.js";
import { SELECTOR, AMOUNT } from "../utils/constants.js";
import { verifyPurchaseAmount, verifyWinningNumbers } from "../utils/validation.js";
import { clearInput } from "../utils/general.js";

export default class LottoController {
  constructor() {
    this.purchaseInput = $(SELECTOR.PURCHASE_INPUT);
    this.lottoNumberList = $(SELECTOR.LOTTO_NUMBER_LIST);
    this.winningNumberInputs = $$(SELECTOR.WINNING_NUMBER_INPUT);
    this.bonusNumberInput = $(SELECTOR.BONUS_NUMBER_INPUT);
    this.modalContainer = $(SELECTOR.MODAL_CONTAINER);

    this.lottoGameModel = new LottoGameModel();
    this.purchaseView = new PurchaseView();
    this.lottoListView = new LottoListView();
    this.winningNumberView = new WinningNumberView();
    this.modalView = new ModalView();

    this.purchaseView.bindPurchase(this.#handlePurchase.bind(this));
    this.lottoListView.bindSwitch(this.#handleSwitch.bind(this));
    this.winningNumberView.bindResult(this.#handleResult.bind(this));
    this.modalView.bindRestart(this.#handleRestart.bind(this));
  }

  #handlePurchase(e) {
    e.preventDefault();

    try {
      const purchaseAmount = this.purchaseInput.valueAsNumber;
      verifyPurchaseAmount(purchaseAmount);

      const lottoCount = Math.floor(purchaseAmount / AMOUNT.UNIT);
      this.lottoGameModel.generateLottoTickets(lottoCount);
      this.winningNumberView.showWinningInput(lottoCount);
      this.lottoListView.enableSwitch();
      this.lottoListView.renderLottoIcons(lottoCount);
      this.purchaseView.disablePurchaseForm();
      this.purchaseView.renderPurchaseInfomation(lottoCount);
    } catch ({ message }) {
      alert(message);
    }
  }

  #handleSwitch() {
    this.lottoListView.resetLottoList();

    this.lottoNumberList.classList.toggle("show-numbers");
    if (this.lottoNumberList.classList.contains("show-numbers")) {
      this.lottoListView.renderLottoNumbers(this.lottoGameModel.getLottoList());
      return;
    }
    this.lottoListView.renderLottoIcons(this.lottoGameModel.getLottoCount());
  }

  #handleResult() {
    const winningNumbers = Array.from(this.winningNumberInputs).map((input) => input.valueAsNumber);
    const bonusNumber = this.bonusNumberInput.valueAsNumber;

    try {
      verifyWinningNumbers([...winningNumbers, bonusNumber]);
      this.lottoGameModel.generateResult(winningNumbers, bonusNumber);
      this.modalView.renderModal(this.lottoGameModel.result, this.lottoGameModel.profitRate);
    } catch ({ message }) {
      alert(message);
    }
  }

  #handleRestart() {
    this.purchaseView.enablePurchaseForm();
    this.purchaseView.resetPurchaseInfomation();
    this.lottoListView.disableSwitch();
    this.lottoListView.resetLottoList();
    this.winningNumberView.hideWinningInput();
    this.modalView.toggleModal();

    this.purchaseInput.focus();
    clearInput(this.purchaseInput, ...this.winningNumberInputs, this.bonusNumberInput);
  }
}
