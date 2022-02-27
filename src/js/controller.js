import LottoData from './lottoData';
import LottoListView from './view/LottoList.js';
import PurchaseFormView from './view/PurchaseForm.js';
import { LOTTO_PRICE } from './constants.js';
import { validateCashInput } from './utils/validation';

export default class Controller {
  #lottoData = new LottoData();
  #purchaseFormView = new PurchaseFormView({
    submitCashHandler: cash => this.#submitCashHanlder(cash),
  });
  #lottoListView = new LottoListView();

  #submitCashHanlder(cash) {
    try {
      validateCashInput(cash);
      this.#lottoData.buyLotto(cash / LOTTO_PRICE);
      this.#lottoListView.showLottoListSection(this.#lottoData.getLottoList());
    } catch ({ message }) {
      alert(message);
    }
  }
}
