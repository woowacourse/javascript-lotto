import $ from '../utils/DomSelector.js';

class LottoGameView {
  constructor() {
    this.purchaseForm = $('#purchase-form');
    this.purchaseInput = $('#purchase-input');
  }

  addPurchaseSubmitEvent(callback) {
    this.purchaseForm.addEventListener('submit', (event) => {
      event.preventDefault();
      callback(event.target['purchase-amount'].value);
    });
  }
}

export default LottoGameView;
