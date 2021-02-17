import { $, validator } from '../util/index.js';
import { LottoView } from '../view/index.js';

export default class LottoController {
  constructor() {
    this.view = new LottoView();
  }

  init() {
    this.view.hide($('#lotto-section'), $('#lotto-result-form'));
  }

  setEvent() {
    $('#purchase-amount-submit').addEventListener(
      'click',
      this.handlePurchaseAmountInput.bind(this)
    );
  }

  handlePurchaseAmountInput() {
    const $input = $('#purchase-amount-input');
    const alertMessage = validator.purchaseAmountInput(Number($input.value));

    if (alertMessage) {
      this.handleInputException($input, alertMessage);

      return;
    }
    // lotto machine에 개수를 넘겨주고 로또 배열을 받는다.
    // 로또 배열을 뷰에 넘겨준다.
  }

  handleInputException($input, alertMessage) {
    alert(alertMessage);
    $input.value = '';
  }
}
