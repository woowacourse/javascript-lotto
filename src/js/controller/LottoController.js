import LottoGame from "../model/LottoGame.js";
import LottoGameView from "../views/LottoGameView.js";
import { $, $$ } from "../utils/dom.js";
import { ERROR_MESSAGES, SELECTOR, AMOUNT } from "../utils/constants.js";
import {
  isValidMinimumAmount,
  isValidAmountUnit,
  isValidWinningNumbers,
} from "../utils/validation.js";

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
    this.resultButton.addEventListener("click", this.onClickResult.bind(this));
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

    const purchaseAmount = Number(this.purchaseInput.value);
    if (!isValidMinimumAmount(purchaseAmount)) {
      alert(ERROR_MESSAGES.INVALID_MINIMUM_AMOUNT);
      return;
    }
    if (!isValidAmountUnit(purchaseAmount)) {
      alert(ERROR_MESSAGES.INVALID_AMOUNT_UNIT);
      return;
    }
    const lottoCount = Math.floor(purchaseAmount / AMOUNT.UNIT);
    this.lottoGameModel.generateLottoTicket(lottoCount);
    this.#handleLottoNumber(lottoCount);
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

  onClickResult() {
    const winningNumbers = Array.from(this.winningNumberInputs).map(($input) =>
      Number($input.value),
    );
    const winningBonusNumber = Number(this.bonusNumberInput.value);

    if (!isValidWinningNumbers([...winningNumbers, winningBonusNumber])) {
      alert(ERROR_MESSAGES.INVALID_LOTTO_RANGE);
      return;
    }
  }
}
