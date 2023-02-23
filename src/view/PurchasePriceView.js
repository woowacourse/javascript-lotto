import { CONSOLE_MESSAGE } from '../js/constants/constants';
// import { exceptionHandler } from '../js/utils/index';
import validator from '../domain/validation/validator';

export default class PurchasePriceView {
  constructor() {
    this.form = document.getElementById('price-form');
    this.input = document.getElementById('price-input');
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
        alert(error);
      }
    });
  }

  renderPurchaseResult(lottoCount, lottos) {
    const msg = CONSOLE_MESSAGE.showLottoCount(lottoCount);
    const msgDiv = document.getElementById('price-result');
    msgDiv.innerHTML = `<span>${msg}</span>`;
    const lottosDiv = document.getElementById('lottos');

    lottos.forEach((lotto) => {
      const lottoDiv = document.createElement('div');
      lottoDiv.innerHTML = `<span>[${lotto.getNumbers().join(', ')}]</span>`;
      lottosDiv.appendChild(lottoDiv);
      // console.log(`[${lotto.getNumbers().join(', ')}]`);
    });
  }

  resetInputValue() {
    this.input.value = '';
  }

  resetPurchaseResult() {
    const msgDiv = document.getElementById('price-result');
    msgDiv.innerHTML = '';
    const lottosDiv = document.getElementById('lottos');
    lottosDiv.innerHTML = '';
  }
}
