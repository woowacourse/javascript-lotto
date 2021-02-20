import { $, validator } from '../util/index.js';
import { LottoView } from '../view/index.js';
import { LottoMachine } from '../model/index.js';

export class LottoController {
  constructor() {
    this.machine = new LottoMachine();
    this.view = new LottoView();
  }

  initEvent() {
    this.$purchaseAmountSubmit = $('#purchase-amount-submit');
    this.$lottoToggle = $('.lotto-numbers-toggle-button');

    this.$purchaseAmountSubmit.setEvent(
      'click',
      this.handlePurchaseAmountInput.bind(this)
    );
    this.$lottoToggle.setEvent('click', this.handleLottoToggle.bind(this));
  }

  handlePurchaseAmountInput() {
    this.$purchaseAmountInput = $('#purchase-amount-input');
    const money = Number(this.$purchaseAmountInput.getValue());
    const alertMessage = validator.purchaseAmountInput(money);

    if (alertMessage) {
      this.handleInputException(this.$purchaseAmountInput, alertMessage);

      return;
    }

    this.machine.publishLottosByAuto(money);
    this.view.renderLottoSection(this.machine.lottos);
    this.$purchaseAmountInput.disable();
    this.$purchaseAmountSubmit.disable();
  }

  handleInputException($input, alertMessage) {
    alert(alertMessage);
    $input.setValue('');
  }

  handleLottoToggle() {
    this.$lottoContainer = $('#lotto-container');
    this.$lottoNumbers = $('.lotto-numbers');

    this.$lottoContainer.toggleClass('flex-col'); // toggle()을 이용해 flex direction 변경.
    $('.lotto-numbers-toggle-button').isCheckedInput()
      ? this.$lottoNumbers.show()
      : this.$lottoNumbers.hide();
  }
}
