import Model from './model';
import LottoListView from './view/LottoList';
import PurchaseFormView from './view/PurchaseForm';

export default class Controller {
  constructor() {
    this.#lottoListView = new LottoListView();
    this.#purchaseFormView = new PurchaseFormView();
    this.#model = new Model();
  }
}
