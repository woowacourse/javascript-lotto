import { $, validator } from '../util/index.js';
import { LottoView } from '../view/index.js';
import { LottoMachine } from '../model/index.js';

export class LottoController {
  constructor() {
    this.machine = new LottoMachine();
    this.view = new LottoView();
  }

  initEvent() {
    $('#purchase-amount-submit').setEvent(
      'click',
      this.handlePurchaseAmountInput.bind(this)
    );
    $('.lotto-numbers-toggle-button').setEvent(
      'click',
      this.handleLottoToggle.bind(this)
    );
  }

  handlePurchaseAmountInput() {
    const $input = $('#purchase-amount-input');
    const money = Number($input.getValue());
    const alertMessage = validator.purchaseAmountInput(money);

    if (alertMessage) {
      this.handleInputException($input, alertMessage);

      return;
    }

    this.machine.publishLottosByAuto(money);
    this.view.renderLottoSection(this.machine.lottos);
    $input.disable();
    $('#purchase-amount-submit').disable();
  }

  handleInputException($input, alertMessage) {
    alert(alertMessage);
    $input.setValue('');
  }

  handleLottoToggle() {
    const $lottoNumbers = $('.lotto-numbers');

    $('#lotto-container').toggleClass('flex-col'); // toggle()을 이용해 flex direction 변경.
    $('.lotto-numbers-toggle-button').isCheckedInput()
      ? $lottoNumbers.show()
      : $lottoNumbers.hide();
  }
}
