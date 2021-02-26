import View from './View.js';
import { $ } from '../utils/selector.js';
import { LOTTO_NUMBERS } from '../utils/constants.js';

export default class ManualInputView extends View {
  constructor(id) {
    const manualInputWrapper = document.createElement('ul');
    manualInputWrapper.setAttribute('id', id);

    super(manualInputWrapper);
  }

  createManualLottos(count) {
    const lottoTicekts = [...Array(count)]
      .map(
        () => `
          <li id="" class="mx-1 my-2 text-4xl manual-wrapper">
            <form class="d-flex items-center justify-between">
              <span class="lotto-icon">🎟️ </span>
              ${this.createManualInput()}
              <button type="submit" id="manual-input-btn" class="btn btn-cyan btn-small">확정</button>
            </form>
          </li>
        `
      )
      .join('');

    this.$element.innerHTML = lottoTicekts;
    $('#input-price-form').insertAdjacentElement('afterend', this.$element);
  }

  createManualInput() {
    return [...Array(LOTTO_NUMBERS.WINNING_NUMBER_COUNT - 1)]
      .map(
        (_, i) => `
          <input
            type="number"
            class="manual-number mx-1 text-center"
            aria-label="manual-number-${i + 1}"
            data-manual-index="${i + 1}"
            required
            min="1"
            max="45"
          />
        `
      )
      .join('');
  }
}
