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
  #winningNumberView = new WinningNumberView();

  constructor() {
    this.#bindEventHandlers();
  }

  #bindEventHandlers() {
    this.#purchaseFormView.bindSubmitCash(cash => this.#handleSubmitCash(cash));
    this.#winningNumberView.bindCheckResult(winningNumbers =>
      this.#handleCheckResult(winningNumbers),
    );
  }

  #handleSubmitCash(cash) {
    try {
      validateCashInput(cash);
      this.#model.setCash(cash);
      this.#model.buyLotto(cash / LOTTO_PRICE);
      this.#lottoListView.showLottoListSection(this.#model.getLottoList());
    } catch ({ message }) {
      alert(message);
    }
  }

  #handleCheckResult(pickedNumbers) {
    this.#model.setWinningLottoQuantity(pickedNumbers);
    const winningLottoQuantity = this.#model.getWinningLottoQuantity();
    const profitRatio = this.#model.calculateProfitRatio();
    this.#winningNumberView.showLottoResult(winningLottoQuantity, profitRatio);
  }
}
