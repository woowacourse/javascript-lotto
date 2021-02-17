import { $, $$, hide, show, validator } from '../util/index.js';
import { LottoView } from '../view/index.js';
import { LottoMachine } from '../model/index.js';

export class LottoController {
  constructor() {
    this.machine = new LottoMachine();
    this.view = new LottoView();
  }

  initEvent() {
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

    this.machine.publishLottosByAuto(money);
    this.view.renderLottoSection(this.machine.lottos);
    $input.disabled = true;
    $('#purchase-amount-submit').disabled = true;
  }

  handleInputException($input, alertMessage) {
    alert(alertMessage);
    $input.value = '';
  }

  handleLottoToggle() {
    const $lottoNumbers = $$('.lotto-numbers');

    $('#lotto-container').classList.toggle('flex-col'); // toggle()을 이용해 flex direction 변경.
    $('.lotto-numbers-toggle-button').checked
      ? show(...$lottoNumbers)
      : hide(...$lottoNumbers);
  }
}
