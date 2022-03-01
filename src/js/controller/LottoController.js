import LottoGame from "../model/LottoGame.js";
import LottoGameView from "../views/LottoGameView.js";
import { $, $$ } from "../utils/dom.js";
import { SELECTOR, AMOUNT } from "../utils/constants.js";
import { verifyPurchaseAmount, verifyWinningNumbers } from "../utils/validation.js";

export default class LottoController {
  constructor() {
    this.lottoGameModel = new LottoGame();
    this.lottoGameView = new LottoGameView();
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

  #handleLottoNumber(lottoCount) {
    this.lottoGameView.disablePurchaseForm();
    this.lottoGameView.enableSwitch();
    this.lottoGameView.renderPurchaseInfomation(lottoCount);
    this.lottoGameView.renderLottoIcons(lottoCount);
    this.lottoGameView.showWinningInput();
  }

  #onSubmitPurchase(e) {
    e.preventDefault();

    try {
      const purchaseAmount = Number(this.purchaseInput.value);
      verifyPurchaseAmount(purchaseAmount);

      const lottoCount = Math.floor(purchaseAmount / AMOUNT.UNIT);
      this.lottoGameModel.generateLottoTicket(lottoCount);
      this.#handleLottoNumber(lottoCount);
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
      this.lottoGameModel.generateResult(winningNumbers, bonusNumber);
    } catch ({ message }) {
      alert(message);
    }
  }
}
