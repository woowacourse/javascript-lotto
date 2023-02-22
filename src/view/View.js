import { $ } from '../utils/dom.js';

export default class View {
  onClickPurchaseAmountSubmitButton(callback) {
    $('.purchase-amount-submit-button').addEventListener('click', callback);
  }

  printLottoQuantity(quantity) {
    $('.lotto-quantity').innerText = `총 ${quantity}개를 구매하였습니다.`;
  }

  showAlert(message) {
    alert(message);
  }
}
