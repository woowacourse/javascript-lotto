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

    let template = '';
    for (let key in WINNING_PRIZE) {
      template += `
        <div class="result-modal-grid-item">${key}</div>
        <div class="result-modal-grid-item">${WINNING_PRIZE[key].toLocaleString()}</div>
        <div class="result-modal-grid-item">${winningLottoQuantity[key]}개</div>
      `;
    }
    this.$resultModalGridContainer.insertAdjacentHTML('beforeend', template);
    this.$resultModalProfitRatio.textContent = profitRatio.toLocaleString();
  }
}
