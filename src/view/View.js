import { $ } from '../utils/dom.js';

export default class View {
  onClickPurchaseAmountSubmitButton(callback) {
    $('.purchase-amount-submit-button').addEventListener('click', callback);
  }

  showAlert(message) {
    alert(message);
  }
}
