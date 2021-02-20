import { $, $$, hide, show, validator } from '../util/index.js';
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

    this.$purchaseAmountSubmit.addEventListener(
      'click',
      this.handlePurchaseAmountInput.bind(this)
    );
    this.$lottoToggle.addEventListener(
      'click',
      this.handleLottoToggle.bind(this)
    );
  }

  handlePurchaseAmountInput() {
    this.$purchaseAmountInput = $('#purchase-amount-input');
    const money = Number(this.$purchaseAmountInput.value);
    const alertMessage = validator.purchaseAmountInput(money);

    if (alertMessage) {
      this.handleInputException(this.$purchaseAmountInput, alertMessage);

      return;
    }

    this.machine.publishLottosByAuto(money);
    this.view.renderLottoSection(this.machine.lottos);
    this.$purchaseAmountInput.disabled = true;
    $('#purchase-amount-submit').disabled = true;
  }

  handleInputException($input, alertMessage) {
    alert(alertMessage);
    $input.value = '';
  }

  handleLottoToggle() {
    this.$lottoContainer = $('#lotto-container');
    this.$lottoNumbers = $$('.lotto-numbers');

    this.$lottoContainer.classList.toggle('flex-col'); // toggle()을 이용해 flex direction 변경.
    this.$lottoToggle.checked
      ? show(...this.$lottoNumbers)
      : hide(...this.$lottoNumbers);
  }
}
