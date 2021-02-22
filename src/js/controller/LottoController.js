import { MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../constants/index.js';
import { $, validator } from '../util/index.js';
export class LottoController {
  $purchaseAmountForm = $('#purchase-amount-form');
  $purchaseAmountInput = $('#purchase-amount-input');
  $purchaseAmountSubmit = $('#purchase-amount-submit');
  $lottoToggle = $('#lotto-numbers-toggle-button');
  $winningNumberInputs = $('[data-winning-number]');
  $resultForm = $('#lotto-result-form');
  $modal = $('#modal');
  $modalClose = $('#modal-close');
  $resetButton = $('#reset-button');

  constructor(model, view) {
    this.machine = model;
    this.view = view;
  }

  initEvent() {
    this.$purchaseAmountForm.setEvent('submit', this.handlePurchaseAmountInput.bind(this));
    this.$lottoToggle.setEvent('click', this.handleLottoToggle.bind(this));
    this.$winningNumberInputs.setEvent('input', this.limitInputLength.bind(this));
    this.$resultForm.setEvent('submit', this.handleResult.bind(this));
    this.$modalClose.setEvent('click', () => this.$('#modal').removeClass('open'));
    this.$resetButton.setEvent('click', this.reset.bind(this));
  }

  handlePurchaseAmountInput(event) {
    event.preventDefault();
    const money = Number(this.$purchaseAmountInput.getValue());
    const alertMessage = validator.purchaseAmount(money);

    if (alertMessage) {
      this.handleInputException(this.$purchaseAmountInput, alertMessage);

      return;
    }

    this.machine.insert(money);
    this.machine.publishLottosByAuto();
    this.view.renderLottoSection(this.machine.lottos);
    this.$purchaseAmountInput.disable();
    this.$purchaseAmountSubmit.disable();
  }

  handleInputException($input, alertMessage) {
    alert(alertMessage);
    $input.setValue('');
  }

  handleLottoToggle() {
    const $lottoContainer = $('#lotto-container');
    const $lottoNumbers = $('[data-lotto-numbers]');

    $lottoContainer.toggleClass('flex-col'); // toggle()을 이용해 flex direction 변경.
    this.$lottoToggle.isCheckedInput() //
      ? $lottoNumbers.show()
      : $lottoNumbers.hide();
  }

  limitInputLength({ target, target: { value } }) {
    const maxLength = String(MAX_LOTTO_NUMBER).length;

    if (value.length > maxLength) {
      target.value = value.slice(0, maxLength);
    }
  }

  handleResult(event) {
    event.preventDefault();
    const numbers = this.$winningNumberInputs
      .filter($input => $input.value !== '')
      .map($input => Number($input.value));
    const alertMessage = validator.lottoNumbers(numbers);

    if (alertMessage) {
      this.handleInputException(this.$winningNumberInputs, alertMessage);

      return;
    }

    this.view.renderWinningResult(this.machine.getWinningStatistics(numbers));
    this.$modal.addClass('open');
  }

  reset() {
    this.$modal.removeClass('open');
    this.$purchaseAmountInput.enable();
    this.$purchaseAmountSubmit.enable();
    this.$purchaseAmountInput.setValue('');
    this.$winningNumberInputs.setValue('');
    this.machine.reset();
    this.view.reset();
  }
}
