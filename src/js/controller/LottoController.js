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
  }

  bindEvents() {
    this.purchaseForm.addEventListener("submit", this.#onSubmitPurchase.bind(this));
    this.switchInput.addEventListener("click", this.#onClickSwitch.bind(this));
    this.resultButton.addEventListener("click", this.#onClickResult.bind(this));
  }

  #onSubmitPurchase(e) {
    e.preventDefault();

    try {
      const purchaseAmount = Number(this.purchaseInput.value);
      verifyPurchaseAmount(purchaseAmount);

      const lottoCount = Math.floor(purchaseAmount / AMOUNT.UNIT);
      this.lottoGameModel.generateLottoTickets(lottoCount);
      this.lottoGameView.showGameView(lottoCount);
    } catch ({ message }) {
      alert(message);
    }
  }

  #onClickSwitch() {
    this.lottoGameView.resetLottoList();

    this.lottoNumberList.classList.toggle("show-numbers");
    if (this.lottoNumberList.classList.contains("show-numbers")) {
      this.lottoGameView.renderLottoNumbers(this.lottoGameModel.getLottoList());
      return;
    }
    this.lottoGameView.renderLottoIcons(this.lottoGameModel.getLottoCount());
  }

  #onClickResult() {
    const winningNumbers = Array.from(this.winningNumberInputs).map(($input) =>
      Number($input.value),
    );
    const bonusNumber = Number(this.bonusNumberInput.value);

    try {
      verifyWinningNumbers([...winningNumbers, bonusNumber]);
      this.lottoGameModel.resetResult();
      this.lottoGameModel.generateResult(winningNumbers, bonusNumber);
      this.modalView.renderModal(this.lottoGameModel.result, this.lottoGameModel.profitRate);
    } catch ({ message }) {
      alert(message);
    }
  }

  setClickRestart = () => {
    this.lottoGameView.resetGameView();
    clearInput(this.purchaseInput, ...this.winningNumberInputs, this.bonusNumberInput);
  };
}
