import View from './View.js';
import { $, $$ } from '../utils/dom.js';

export default class PurchaseLottosView extends View {
  constructor($element) {
    super($element);
    this.bindPurchaseLottoEvent();
  }

  resetPurchaseMethodButton() {
    $$('.purchase-method-btns').forEach(button => {
      if (button.classList.contains('btn-clicked')) {
        button.classList.remove('btn-clicked');
      }
      button.classList.remove('cursor-not-allowed');
      button.classList.add('hover-btn');
      button.removeAttribute('disabled');
    });

    return this;
  }

  bindPurchaseLottoEvent() {
    $('#mixed-purchase-btn').addEventListener('click', e => this.mixedPurchaseHandler(e));
    $('#auto-purchase-btn').addEventListener('click', e => this.autoPurchaseHandler(e));
  }

  mixedPurchaseHandler(e) {
    this.emit('mixedPurchase');
  }

  autoPurchaseHandler(e) {
    this.emit('allAutoPurchase');
  }
}
