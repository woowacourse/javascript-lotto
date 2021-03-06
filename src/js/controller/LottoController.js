import { MAX_LOTTO_NUMBER, UNIT_AMOUNT } from '../constants/index.js';
import { $, validator } from '../util/index.js';
export class LottoController {
  constructor(model, view) {
    this.machine = model;
    this.view = view;
  }

  initEvent() {
    this.$purchaseAmountForm = $('#purchase-amount-form');
    this.$lottoToggle = $('#lotto-numbers-toggle-button');
    this.$winningNumberInputs = $('.lotto-number');
    this.$resultForm = $('#lotto-result-form');
    this.$modal = $('#modal');
    this.$modalClose = $('#modal-close');
    this.$resetButton = $('#reset-button');
    this.$autoAmountPurchaseForm = $('#auto-amount-purchase-form');
    this.$manualPurchaseForm = $('#manual-purchase-form');
    this.$purchaseTypeToggle = $('#purchase-type-toggle-button');

    this.$purchaseAmountForm.setEvent('submit', this.handlePurchaseAmountInput.bind(this));
    this.$autoAmountPurchaseForm.setEvent('submit', this.handleAutoAmountInput.bind(this));
    this.$manualPurchaseForm.setEvent('submit', this.handleManualInputs.bind(this));
    this.$purchaseTypeToggle.setEvent('change', this.handlePurchaseTypeToggle.bind(this));
    this.$lottoToggle.setEvent('change', this.handleLottoToggle.bind(this));
    this.$winningNumberInputs.setEvent('input', this.handleLengthLimit.bind(this));
    this.$resultForm.setEvent('submit', this.handleResult.bind(this));
    this.$modalClose.setEvent('click', () => this.$modal.removeClass('open'));
    this.$resetButton.setEvent('click', this.reset.bind(this));
  }

  handlePurchaseAmountInput(event) {
    event.preventDefault();
    this.$purchaseAmountInput = $('#purchase-amount-input');
    this.$purchaseAmountSubmit = $('#purchase-amount-submit');
    const money = Number(this.$purchaseAmountInput.getValue());
    const alertMessage = validator.purchaseAmount(money);

    if (alertMessage) {
      this.handleInputException(this.$purchaseAmountInput, alertMessage);

      return;
    }

    this.machine.insert(money);
    this.view.renderPurchaseSection(money);
    this.view.renderLottoSection(this.machine.lottos);
    this.$purchaseAmountInput.disable();
    this.$purchaseAmountSubmit.disable();
  }

  handleInputException($input, alertMessage) {
    alert(alertMessage);
    $input.setValue('');
  }

  handleAutoAmountInput(event) {
    event.preventDefault();
    this.$autoAmountInput = $('#auto-amount-input');
    const leftMoney = this.machine.currentMoney;
    const autoAmount = Number(this.$autoAmountInput.getValue());
    const alertMessage = validator.autoPurchase(leftMoney, autoAmount);
    if (alertMessage) {
      this.handleInputException(this.$autoAmountInput, alertMessage);

      return;
    }
    this.$autoAmountInput.setValue('');
    this.machine.publishLottosByAuto(autoAmount);
    this.view.renderPurchaseSection(this.machine.currentMoney);
    this.view.renderLottoSection(this.machine.lottos);
  }

  handleManualInputs(event) {
    event.preventDefault();
    this.$manualInputs = $('[data-manual-lotto-number]');
    const leftMoney = this.machine.currentMoney;
    const manualNumbers = this.$manualInputs.filter($input => $input.value !== '').map($input => Number($input.value));
    const alertMessage = validator.manualPurchase(leftMoney) || validator.lottoNumbers(manualNumbers);

    if (alertMessage) {
      this.handleInputException(this.$manualInputs, alertMessage);

      return;
    }
    this.$manualInputs.setValue('');
    this.machine.publishLottoByManual(manualNumbers);
    this.view.renderPurchaseSection(this.machine.currentMoney);
    this.view.renderLottoSection(this.machine.lottos);
  }

  handlePurchaseTypeToggle() {
    if (this.$purchaseTypeToggle.isCheckedInput()) {
      this.$autoAmountPurchaseForm.hide();
      this.$manualPurchaseForm.show();
    } else {
      this.$autoAmountPurchaseForm.show();
      this.$manualPurchaseForm.hide();
    }
  }

  handleLottoToggle() {
    this.$lottoContainer = $('#lotto-container');
    this.$lottoNumbers = $('[data-lotto-numbers]');

    this.$lottoContainer.toggleClass('flex-col'); // toggle()을 이용해 flex direction 변경.
    this.$lottoToggle.isCheckedInput() //
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

  handleResult(event) {
    event.preventDefault();
    const numbers = this.$winningNumberInputs.filter($input => $input.value !== '').map($input => Number($input.value));
    const alertMessage = validator.winningNumbers(numbers);
    const currentMoney = this.machine.currentMoney;

    if (alertMessage) {
      this.handleInputException(this.$winningNumberInputs, alertMessage);

      return;
    }

    if (currentMoney > 0) {
      const answer = confirm(
        `현재 남은 잔액은 ${currentMoney}원 입니다.\n확인 버튼을 누르시면 남은 잔액으로 자동 구매를 진행합니다.`
      );

      if (!answer) {
        return;
      }

      this.machine.publishLottosByAuto(currentMoney / UNIT_AMOUNT);
      this.view.renderPurchaseSection(this.machine.currentMoney);
      this.view.renderLottoSection(this.machine.lottos);
    }

    this.view.renderWinningResult(this.machine.getWinningStatistics(numbers));
    this.$modal.addClass('open');
  }

  reset() {
    this.machine.reset();
    this.$modal.removeClass('open');
    this.$purchaseAmountInput.enable();
    this.$purchaseAmountSubmit.enable();
    this.$purchaseAmountInput.setValue('');
    this.$winningNumberInputs.setValue('');
    this.view.reset();
  }
}
