import { CLASS_SELECTOR, ID_SELECTOR, LOTTO_RULE, WINNING_PRIZE } from '../constants';
import { $, $$, addClassName, removeClassName, replaceHTML } from '../utils/dom';

export class WinningNumberView {
  constructor() {
    this.#configureDOM();
    this.bindCloseModal();
    this.bindMoveFocus();
  }

  #configureDOM() {
    this.$pickedNumbersForm = $(ID_SELECTOR.PICKED_NUMBERS_FORM);
    this.$resultModalBackground = $(ID_SELECTOR.RESULT_MODAL_BACKGROUND);
    this.$resultModalGridContainer = $(ID_SELECTOR.RESULT_MODAL_GRID_CONTAINER);
    this.$resultModalClose = $(ID_SELECTOR.RESULT_MODAL_CLOSE);
    this.$resultModalReset = $(ID_SELECTOR.RESULT_MODAL_RESET);
    this.$resultModalProfitRatio = $(ID_SELECTOR.RESULT_MODAL_PROFIT_RATIO);
    this.$pickedNumberInputs = $$(CLASS_SELECTOR.PICKED_NUMBER_INPUT);
    this.$body = document.querySelector('body');
  }

  bindCheckResult(handler) {
    this.$pickedNumbersForm.addEventListener('submit', event => {
      event.preventDefault();
      handler([...event.target.elements.pickedNumber].map(input => input.valueAsNumber));
    });
  }

  // 무조건 handler로 넘겨줘서 이벤트는 컨트롤러에서 실행되도록 하는 것이 좋을까?
  bindCloseModal() {
    this.$resultModalClose.addEventListener('click', () => {
      this.$resultModalBackground.classList.remove(CLASS_SELECTOR.OPEN);
    });
  }

  bindRestart(handler) {
    this.$resultModalReset.addEventListener('click', () => {
      this.$pickedNumbersForm.classList.add(CLASS_SELECTOR.PICKED_NUMBERS_FORM_DISPLAY_NONE);

      handler();
    });
  }

  bindMoveFocus() {
    this.$pickedNumberInputs.forEach($input => {
      $input.addEventListener('input', () => {
        this.#moveFocusHandler($input);
      });
    });
  }

  bindClickModalOutside() {
    this.$resultModalBackground.addEventListener('click', this.displayNoneResultModal.bind(this));
  }

  moveFocusOnWinningNumberInput() {
    this.$pickedNumberInputs[0].focus();
  }

  #moveFocusHandler($element) {
    if ($element.value.length === 2) {
      Array.from(this.$pickedNumberInputs)
        .find($input => $input.value === '')
        ?.focus();
    }
  }

  displayPickedNumbersForm() {
    addClassName(this.$pickedNumbersForm, CLASS_SELECTOR.PICKED_NUMBERS_FORM_DISPLAY);
  }

  displayNonePickedNumbersForm() {
    removeClassName(this.$pickedNumbersForm, CLASS_SELECTOR.PICKED_NUMBERS_FORM_DISPLAY);
  }

  displayResultModal() {
    addClassName(this.$resultModalBackground, CLASS_SELECTOR.OPEN);
    addClassName(this.$body, 'scroll-block');
  }

  displayNoneResultModal() {
    removeClassName(this.$resultModalBackground, CLASS_SELECTOR.OPEN);
    removeClassName(this.$body, 'scroll-block');
  }

  clearInputs() {
    this.$pickedNumbersForm.reset();
  }

  showLottoResult(winningLottoQuantity, profitRatio) {
    this.displayResultModal();
    replaceHTML(this.$resultModalGridContainer, resultGridTemplate(winningLottoQuantity));
    this.$resultModalProfitRatio.textContent = profitRatio.toLocaleString();
  }
}

function resultGridTemplate(winningLottoQuantity) {
  return (
    `<div class="result-modal-grid-item">일치 개수</div>
    <div class="result-modal-grid-item">당첨금</div>
    <div class="result-modal-grid-item">당첨 갯수</div>` +
    Object.keys(WINNING_PRIZE)
      .map(
        key => `
        <div class="result-modal-grid-item">${key}</div>
        <div class="result-modal-grid-item">${WINNING_PRIZE[key].toLocaleString()}</div>
        <div class="result-modal-grid-item">${winningLottoQuantity[key]}개</div>
      `,
      )
      .join('')
  );
}
