import { CONSOLE_MESSAGE } from '../constants/constants';
import validator from '../domain/validation/validator';

export default class PurchasePriceView {
  constructor() {
    this.form = document.getElementById('purchase-lotto-form');
    this.input = document.getElementById('price-input');
    this.purchaseResultSection = document.getElementById('purchase-result');
  }

  addSubmitEvent(submitHandler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const purchasePriceInput = this.input.value;

      try {
        validator.purchasePrice(purchasePriceInput);
        submitHandler(purchasePriceInput);
      } catch (error) {
        this.resetInputValue();
        console.log(error);
        alert(error);
      }
    });
  }

  renderPurchaseResult(lottoCount, lottos) {
    const msg = CONSOLE_MESSAGE.showLottoCount(lottoCount);
    const purchaseCountSpan = document.createElement('span');
    purchaseCountSpan.setAttribute('id', 'purchase-count');
    purchaseCountSpan.innerText = `${msg}`;

    const lottosDiv = document.createElement('div');
    lottosDiv.setAttribute('id', 'lottos');

    lottos.forEach((lotto) => {
      const lottoSpan = document.createElement('span');
      lottoSpan.innerText = `🎟️ ${lotto.getNumbers().join(', ')}`;
      lottosDiv.appendChild(lottoSpan);
      // console.log(`[${lotto.getNumbers().join(', ')}]`);
    });

    this.purchaseResultSection.appendChild(purchaseCountSpan);
    this.purchaseResultSection.appendChild(lottosDiv);
  }

  resetInputValue() {
    this.input.value = '';
  }

  resetPurchaseResult() {
    const msgDiv = document.getElementById('purchase-result');
    msgDiv.innerHTML = '';

    const lottosDiv = document.getElementById('winning-lotto');
    lottosDiv.innerHTML = '';
  }
}
