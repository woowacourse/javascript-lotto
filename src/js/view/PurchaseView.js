import { $ } from '../util/querySelector.js';
import getFormData from '../util/getFormData.js';

class PurchaseView {
  #submitBudget;

  constructor(controllerFunction) {
    this.#submitBudget = controllerFunction;
    this.#setListener();
  }

  clear() {
    $('#purchasedLottoCount').innerText = '';
    $('#purchasedLottoList').innerHTML = '';
  }
}

export default PurchaseView;
