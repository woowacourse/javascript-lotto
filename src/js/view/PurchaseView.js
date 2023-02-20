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

  #setListener() {
    console.log({ buyButton: $('#buyButton') });
    $('#buyButton').addEventListener('click', (event) => {
      event.preventDefault();

      const budget = getFormData($('#budgetInputForm')).budget;
      const trimmedBudget = Number(budget);

      this.#submitBudget(trimmedBudget);
    });
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
