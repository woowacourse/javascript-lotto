import View from './View.js';
import { $, $$ } from '../utils/dom.js';
import { LOTTO_NUMBERS } from '../utils/constants.js';

export default class ManualPurchaseView extends View {
  constructor($element) {
    super($element);
    this.renderMixedPurchaseInputForm();
    this.bindManualPurchaseEvent();
    this.inputNumbers = [];
  }

  resetManualPurchaseForm() {
    $('#manual-purchase-form').reset();
    this.inputNumbers = [];

    return this;
  }

  bindManualPurchaseEvent() {
    $('#remaining-auto-purchase-btn').addEventListener('click', () => {
      this.emit('remainingAutoPurchase');
    });

    $$('.manual-lotto-number').forEach(($inputNumber, idx) => {
      $inputNumber.addEventListener('change', () =>
        this.inputManualNumberHandler($inputNumber)
      );
      $inputNumber.addEventListener('input', () =>
        this.moveFocusHandler($inputNumber, idx)
      );
    });

    $('#manual-purchase-form').addEventListener('submit', e => {
      this.submitInputNumberHandler(e);
    });
  }

  inputManualNumberHandler($element) {
    this.inputNumbers[$element.dataset.indexNum] = Number($element.value);
  }

  moveFocusHandler($element, idx) {
    if ($element.value.length === 2) {
      if (idx === LOTTO_NUMBERS.LOTTO_COUNT - 1) return;

      $$('.manual-lotto-number')[idx + 1].focus();
    }
  }

  submitInputNumberHandler(e) {
    e.preventDefault();
    this.emit('submitNumbers', this.inputNumbers);
  }

  showRemainingCount(remainingCount) {
    $(
      '#remaining-lotto-count'
    ).innerText = `수동 구매: ${remainingCount}개 가능`;
  }

  renderMixedPurchaseInputForm() {
    $('#manual-purchase').innerHTML = this.manualPurchasedInputForm();
    $('.manual-lotto-number').focus();
  }

  manualPurchasedInputForm() {
    return `
    <form id="manual-purchase-form" class="d-flex justify-between items-center">
      <div>
        <input
          type="number"
          class="manual-lotto-number mx-1 text-center number-input"
          aria-label="manual-number-1"
          data-index-num="0"
          required
          min="1"
          max="45"
        />
        <input
          type="number"
          class="manual-lotto-number mx-1 text-center number-input"
          aria-label="manual-number-2"
          data-index-num="1"
          required
          min="1"
          max="45"
        />
        <input
          type="number"
          class="manual-lotto-number mx-1 text-center number-input"
          aria-label="manual-number-3"
          data-index-num="2"
          required
          min="1"
          max="45"
        />
        <input
          type="number"
          class="manual-lotto-number mx-1 text-center number-input"
          aria-label="manual-number-4"
          data-index-num="3"
          required
          min="1"
          max="45"
        />
        <input
          type="number"
          class="manual-lotto-number mx-1 text-center number-input"
          aria-label="manual-number-5"
          data-index-num="4"
          required
          min="1"
          max="45"
        />
        <input
          type="number"
          class="manual-lotto-number mx-1 text-center number-input"
          aria-label="manual-number-6"
          data-index-num="5"
          required
          min="1"
          max="45"
        />
      </div>
      <button
        type="submit"
        id="save-manual-input"
        class="btn btn-cyan"> 저장
      </button>
    </form>`;
  }
}
