import { $, $$, hide, show, validator } from '../util/index.js';
import { LottoView } from '../view/index.js';
import { LottoMachine } from '../model/index.js';

export default class LottoController {
  constructor() {
    this.machine = new LottoMachine();
    this.view = new LottoView();
  }

  init() {
    hide($('#lotto-section'), $('#lotto-result-form'));
  }

  setEvent() {
    $('#purchase-amount-submit').addEventListener(
      'click',
      this.handlePurchaseAmountInput.bind(this)
    );
    $('.switch').addEventListener('click', this.handleLottoToggle.bind(this));
  }

  handlePurchaseAmountInput() {
    const $input = $('#purchase-amount-input');
    const money = Number($input.value);
    const alertMessage = validator.purchaseAmountInput(money);

    if (alertMessage) {
      this.handleInputException($input, alertMessage);

      return;
    }
    this.machine.publishLottoByAuto(money);
    this.view.renderLottoSection(this.machine.lottos);
    $input.disabled = true;
    $('#purchase-amount-submit').disabled = true;
  }

  handleInputException($input, alertMessage) {
    alert(alertMessage);
    $input.value = '';
  }

  handleLottoToggle() {
    if (!$('.lotto-numbers-toggle-button').checked) {
      $('#lotto-container').classList.remove('flex-col');
      hide(...$$('.lotto-numbers'));

      return;
    }
    $('#lotto-container').classList.add('flex-col');
    show(...$$('.lotto-numbers'));
  }
}
