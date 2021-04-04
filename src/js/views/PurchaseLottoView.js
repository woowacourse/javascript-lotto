import View from './View.js';
import { $, $$ } from '../utils/dom.js';

export default class PurchaseLottosView extends View {
  constructor($element) {
    super($element);

    this.bindPurchaseLottoEvent();
  }

  resetButton() {
    this.resetPurchaseMethodButton();
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
  }

  bindPurchaseLottoEvent() {
    $('#mixed-purchase-btn').addEventListener('click', e =>
      this.mixedPurchaseHandler(e)
    );
    $('#auto-purchase-btn').addEventListener('click', e =>
      this.autoPurchaseHandler(e)
    );
  }

  mixedPurchaseHandler(e) {
    this.emit('mixedPurchase');

    this.checkClickedButton(e.target);
  }

  autoPurchaseHandler(e) {
    this.emit('allAutoPurchase');

    this.checkClickedButton(e.target);
  }

  checkClickedButton(clickedButton) {
    clickedButton.classList.add('btn-clicked');
    this.blockPurchaseMethodButton();
  }

  blockPurchaseMethodButton() {
    $$('.purchase-method-btns').forEach(button => {
      button.classList.add('cursor-not-allowed');
      button.setAttribute('disabled', true);
      button.classList.remove('hover-btn');
    });
  }
}
