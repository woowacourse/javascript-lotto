import Model from './model.js';
import LottoListView from './view/LottoList.js';
import PurchaseFormView from './view/PurchaseForm.js';
import { LOTTO_PRICE } from './constants.js';
import { validateCashInput } from './utils/validation';

export default class Controller {
  #model = new Model();
  #purchaseFormView = new PurchaseFormView();
  #lottoListView = new LottoListView();

  constructor() {
    this.#bindEventHandlers();
  }

  #bindEventHandlers() {
    this.#purchaseFormView.setOnSubmitCash(cash => this.#onSubmitCash(cash));
  }

  #onSubmitCash(cash) {
    try {
      validateCashInput(cash);
      this.#model.buyLotto(cash / LOTTO_PRICE);
      this.#lottoListView.showLottoListSection(this.#model.getLottoList());
    } catch ({ message }) {
      alert(message);
    }
  }
}
