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

  #renderLottoCount(lottoCount) {
    $('#purchasedLottoCount').innerText = `총 ${lottoCount}개를 구매했습니다.`;
  }
}

export default PurchaseView;
