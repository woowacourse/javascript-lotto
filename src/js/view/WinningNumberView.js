import { CLASS_SELECTOR, ID_SELECTOR, WINNING_PRIZE } from '../constants';
import { $ } from '../utils/dom';

export class WinningNumberView {
  constructor() {
    this.#configureDOM();
  }

  #configureDOM() {
    this.$pickedNumbersForm = $(ID_SELECTOR.PICKED_NUMBERS_FORM);
    this.$resultModalBackground = $(ID_SELECTOR.RESULT_MODAL_BACKGROUND);
    this.$resultModalGridContainer = $(ID_SELECTOR.RESULT_MODAL_GRID_CONTAINER);
    this.$resultModalClose = $(ID_SELECTOR.RESULT_MODAL_CLOSE);
    this.$resultModalReset = $(ID_SELECTOR.RESULT_MODAL_RESET);
    this.$resultModalProfitRatio = $(ID_SELECTOR.RESULT_MODAL_PROFIT_RATIO);
  }

  bindCheckResult(handler) {
    this.$pickedNumbersForm.addEventListener('submit', event => {
      event.preventDefault();
      handler([...event.target.elements.pickedNumber].map(input => input.valueAsNumber));
    });
  }

  showLottoResult(winningLottoQuantity, profitRatio) {
    this.$resultModalBackground.classList.add(CLASS_SELECTOR.OPEN);

    this.$resultModalGridContainer.insertAdjacentHTML(
      'beforeend',
      resultGridTemplate(winningLottoQuantity),
    );

    this.$resultModalProfitRatio.textContent = profitRatio.toLocaleString();
  }
}

function resultGridTemplate(winningLottoQuantity) {
  return Object.keys(WINNING_PRIZE)
    .map(
      key => `
        <div class="result-modal-grid-item">${key}</div>
        <div class="result-modal-grid-item">${WINNING_PRIZE[key].toLocaleString()}</div>
        <div class="result-modal-grid-item">${winningLottoQuantity[key]}개</div>
      `,
    )
    .join('');
}
