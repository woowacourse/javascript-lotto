import { MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../constants/index.js';
import { $, validator } from '../util/index.js';
export class LottoController {
  constructor(model, view) {
    this.machine = model;
    this.view = view;
  }

  initEvent() {
    this.$purchaseAmountForm = $('#purchase-amount-form');
    this.$lottoToggle = $('#lotto-numbers-toggle-button');
    this.$winningNumbers = $('input[data-winning-number]');

    this.$purchaseAmountForm.setEvent(
      'submit',
      this.handlePurchaseAmountInput.bind(this)
    );
    this.$lottoToggle.setEvent('click', this.handleLottoToggle.bind(this));
    this.$winningNumbers.setEvent('input', this.handleLengthLimit.bind(this));
  }

  handlePurchaseAmountInput(event) {
    event.preventDefault();
    this.$purchaseAmountInput = $('#purchase-amount-input');
    this.$purchaseAmountSubmit = $('#purchase-amount-submit');
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
    this.$lottoNumbers = $('span[data-lotto-numbers]');

    this.$lottoContainer.toggleClass('flex-col'); // toggle()을 이용해 flex direction 변경.
    this.$lottoToggle.isCheckedInput()
      ? this.$lottoNumbers.show()
      : this.$lottoNumbers.hide();
  }

  handleLengthLimit({ target, target: { value } }) {
    const maxLength = String(MAX_LOTTO_NUMBER).length;

    if (isNaN(value)) {
      target.value = '';

      return;
    }

    if (value.length > maxLength) {
      target.value = value.slice(0, maxLength);
    }
  }
}
