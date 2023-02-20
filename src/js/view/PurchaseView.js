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

  render(lottos) {
    this.clear();
    this.#renderLottoCount(lottos.length);
    this.#renderPurchasedLottoList(lottos);
  }

  #renderLottoCount(lottoCount) {
    $('#purchasedLottoCount').innerText = `총 ${lottoCount}개를 구매했습니다.`;
  }

  #renderPurchasedLottoList(lottos) {
    lottos.forEach((currentLotto) => {
      $('#purchasedLottoList').insertAdjacentHTML(
        'beforeend',
        this.#getLottoInformationComponent(currentLotto)
      );
    });
  }

  #getLottoInformationComponent(currentLotto) {
    return `
      <div class="purchased-lotto">
        <img class="lotto-icon" src="/src/images/lotto_icon.png" />
        <div class="lotto-numbers">${currentLotto.join(', ')}</div>
      </div>`;
  }
}

export default PurchaseView;
