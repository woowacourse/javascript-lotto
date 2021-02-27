import View from './View.js';
import { $, $$ } from '../utils/selector.js';
import { LOTTO_NUMBERS } from '../utils/constants.js';

export default class ManualInputView extends View {
  constructor(id, count) {
    const manualInputWrapper = document.createElement('ul');
    manualInputWrapper.setAttribute('id', id);
    super(manualInputWrapper);

    this.createManualLottos(count);
    this.bindManualInputEvent();
    this.showAllConfirmButton();
    this.bindConfirmEvent();
  }

  createManualLottos(count) {
    const lottoTicekts = [...Array(count)]
      .map(
        (_, idx) => `
          <li id="manual-wrapper-${idx}" class="mx-1 my-2 text-4xl manual-wrapper">
            <form class="d-flex items-center justify-between manual-input-form">
              <span class="lotto-icon">🎟️ </span>
              ${this.createManualInput()}
              <button type="submit" class="btn btn-cyan btn-small manual-input-btn">확정</button>
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
            aria-label="manual-number-${i}"
            data-manual-index="${i}"
            required
            min="1"
            max="45"
          />
        `
      )
      .join('');
  }

  bindManualInputEvent() {
    $$('.manual-input-form').forEach((manualTicket, idx) => {
      manualTicket.addEventListener('submit', e => {
        e.preventDefault();
        this.emit('submitNumbers', {
          numbers: [...manualTicket.getElementsByTagName('input')],
          ticketNumber: idx,
        });
      });
    });
  }

  confirmManualLottos(lotto, ticketNumber) {
    $(`#manual-wrapper-${ticketNumber}`).innerHTML = `
      <span class="lotto-icon">🎟️ </span>
      <span class="lotto-detail">${lotto.numberDetail}</span>
    `;
  }

  showAllConfirmButton() {
    const allConfirmBtn = document.createElement('template');
    allConfirmBtn.innerHTML = `
      <button
        type="submit"
        id="manual-confirm-btn"
        class="mt-5 btn btn-cyan w-100"
      >
        구매 확정하기
      </button>
    `;
    this.$element.appendChild(allConfirmBtn.content);
  }

  bindConfirmEvent() {
    $('#manual-confirm-btn').addEventListener('click', () => {
      this.emit('confirm', [...$$('.lotto-detail')].length);
    });
  }
}
