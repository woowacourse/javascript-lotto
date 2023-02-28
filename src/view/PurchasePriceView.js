import { $ } from '../utils/dom';

import { CONSOLE_MESSAGE } from '../constants/constants';
import validator from '../domain/validation/validator';
import PurchasedLottoTemplate from './components/PurchasedLotto';

export default class PurchasePriceView {
  constructor() {
    this.form = $('#purchase-lotto-form');
    this.input = $('#price-input');
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
    const lottoCountMsg = CONSOLE_MESSAGE.showLottoCount(lottoCount);
    $('#purchase-count').innerText = `${lottoCountMsg}`;

    lottos.forEach((lotto) =>
      $('#lottos').insertAdjacentHTML(
        'afterbegin',
        PurchasedLottoTemplate(lotto)
      )
    );
  }

  resetInputValue() {
    this.input.value = '';
  }

  resetPurchaseResult() {
    this.resetInputValue();
    $('#purchase-count').innerText = '';
    $('#lottos').innerHTML = '';
  }
}
