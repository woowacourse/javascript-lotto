import LottoGame from "../model/LottoGame.js";
import LottoGameView from "../views/LottoGameView.js";
import ModalView from "../views/ModalView.js";

import { $, $$ } from "../utils/dom.js";
import { SELECTOR, AMOUNT } from "../utils/constants.js";
import { verifyPurchaseAmount, verifyWinningNumbers } from "../utils/validation.js";
import { clearInput } from "../utils/general.js";

export default class LottoController {
  constructor() {
    this.lottoGameModel = new LottoGame();
    this.lottoGameView = new LottoGameView();
    this.modalView = new ModalView(this.setClickRestart);

    this.switchInput = $(SELECTOR.SWITCH_INPUT);
    this.purchaseInput = $(SELECTOR.PURCHASE_INPUT);
    this.lottoNumberList = $(SELECTOR.LOTTO_NUMBER_LIST);
    this.purchaseForm = $(SELECTOR.PURCHASE_FORM);
    this.winningNumberInputs = $$(SELECTOR.WINNING_NUMBER_INPUT);
    this.resultButton = $(SELECTOR.RESULT_BUTTON);
    this.bonusNumberInput = $(SELECTOR.BONUS_NUMBER_INPUT);
    this.purchaseInput.focus();
  }

  bindEvents() {
    this.purchaseForm.addEventListener("submit", this.#handlePurchase.bind(this));
    this.switchInput.addEventListener("click", this.#handleSwitch.bind(this));
    this.resultButton.addEventListener("click", this.#handleResult.bind(this));
  }

  #handlePurchase(e) {
    e.preventDefault();

    try {
      const purchaseAmount = this.purchaseInput.valueAsNumber;
      verifyPurchaseAmount(purchaseAmount);

      const lottoCount = Math.floor(purchaseAmount / AMOUNT.UNIT);
      this.lottoGameModel.generateLottoTickets(lottoCount);
      this.lottoGameView.showGameView(lottoCount);
      this.lottoGameView.setAutoCursor(this.winningNumberInputs, this.bonusNumberInput);
    } catch ({ message }) {
      alert(message);
    }
  }

  #handleSwitch() {
    this.lottoGameView.resetLottoList();

    this.lottoNumberList.classList.toggle("show-numbers");
    if (this.lottoNumberList.classList.contains("show-numbers")) {
      this.lottoGameView.renderLottoNumbers(this.lottoGameModel.getLottoList());
      return;
    }
    this.lottoGameView.renderLottoIcons(this.lottoGameModel.getLottoCount());
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

  setClickRestart = () => {
    this.lottoGameView.resetGameView();
    this.purchaseInput.focus();
    clearInput(this.purchaseInput, ...this.winningNumberInputs, this.bonusNumberInput);
  };
}
