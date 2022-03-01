import Model from './model.js';
import LottoListView from './view/LottoList.js';
import PurchaseFormView from './view/PurchaseForm.js';
import { LOTTO_PRICE } from './constants.js';
import { validateCashInput } from './utils/validation';
import { WinningNumberView } from './view/WinningNumberView';

export default class Controller {
  #model = new Model();
  #purchaseFormView = new PurchaseFormView();
  #lottoListView = new LottoListView();
  #WinningNumberView = new WinningNumberView();

  constructor() {
    this.#bindEventHandlers();
  }

  #bindEventHandlers() {
    this.#purchaseFormView.bindSubmitCash(cash => this.#handleSubmitCash(cash));
    this.#WinningNumberView.bindCheckResult(winningNumbers =>
      this.#handleCheckResult(winningNumbers),
    );
  }

  #handleSubmitCash(cash) {
    try {
      validateCashInput(cash);
      this.#model.buyLotto(cash / LOTTO_PRICE);
      this.#lottoListView.showLottoListSection(this.#model.getLottoList());
    } catch ({ message }) {
      alert(message);
    }
  }

  #handleCheckResult(pickedNumbers) {}
}
