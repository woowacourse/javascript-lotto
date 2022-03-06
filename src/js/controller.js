import Model from './model.js';
import LottoListView from './view/LottoListView.js';
import PurchaseFormView from './view/PurchaseFormView.js';
import WinningNumberView from './view/WinningNumberView';

import { validateCashInput, validatePickedNumbers } from './utils/validation';
import { LOTTO_PRICE } from './constants/lotto.js';

export default class Controller {
  #model = new Model();
  #purchaseFormView = new PurchaseFormView();
  #lottoListView = new LottoListView();
  #winningNumberView = new WinningNumberView();

  constructor() {
    this.#bindEventHandlers();
  }

  #bindEventHandlers() {
    this.#purchaseFormView.bindSubmitCash(cash => this.#handleSubmitCash(cash));
    this.#winningNumberView.bindCheckResult(winningNumbers =>
      this.#handleCheckResult(winningNumbers),
    );
    this.#winningNumberView.bindRestart(() => this.#handleRestart());
  }

  #handleSubmitCash(cash) {
    try {
      validateCashInput(cash);
      this.#model.setCash(cash);
      this.#model.buyLotto(cash);
      this.#purchaseFormView.disableSubmit();
      this.#lottoListView.showLottoListSection(this.#model.getLottoList());
      this.#winningNumberView.displayPickedNumbersForm();
      this.#winningNumberView.moveFocusOnWinningNumberInput();
    } catch ({ message }) {
      alert(message);
    }
  }

  #handleCheckResult(pickedNumbers) {
    try {
      validatePickedNumbers(pickedNumbers);
      this.#model.setWinningLottoQuantity(pickedNumbers);
      this.#winningNumberView.showLottoResult(
        this.#model.getWinningLottoQuantity(),
        this.#model.calculateProfitRatio(),
      );
      this.#winningNumberView.bindClickModalOutside();
    } catch ({ message }) {
      alert(message);
    }
  }

  #handleRestart() {
    this.#winningNumberView.displayNoneResultModal();
    this.#winningNumberView.displayNonePickedNumbersForm();
    this.#lottoListView.displayNoneLottoListSection();
    this.#purchaseFormView.clearInput();
    this.#winningNumberView.clearInputs();
    this.#purchaseFormView.enableSubmit();
  }
}
