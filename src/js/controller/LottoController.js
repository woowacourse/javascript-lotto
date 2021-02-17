import { $, validator } from '../util/index.js';
import { LottoView } from '../view/index.js';
import { LottoMachine } from '../model/index.js';

export default class LottoController {
  constructor() {
    this.lottoMachine = new LottoMachine();
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
    const money = Number($input.value);
    const alertMessage = validator.purchaseAmountInput(money);

    if (alertMessage) {
      this.handleInputException($input, alertMessage);

      return;
    }
    this.lottoMachine.getLottoByAuto(money);
    // this.view.renderLottoSection(this.machine.lotttos);
  }

  handleInputException($input, alertMessage) {
    alert(alertMessage);
    $input.value = '';
  }
}
