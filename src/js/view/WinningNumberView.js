import { CLASS_SELECTOR, ID_SELECTOR, LOTTO_RULE, WINNING_PRIZE } from '../constants';
import { $, $$, replaceHTML } from '../utils/dom';

export class WinningNumberView {
  constructor() {
    this.#configureDOM();
    this.bindCloseModal();
    this.bindInput();
  }

  #configureDOM() {
    this.$pickedNumbersForm = $(ID_SELECTOR.PICKED_NUMBERS_FORM);
    this.$resultModalBackground = $(ID_SELECTOR.RESULT_MODAL_BACKGROUND);
    this.$resultModalGridContainer = $(ID_SELECTOR.RESULT_MODAL_GRID_CONTAINER);
    this.$resultModalClose = $(ID_SELECTOR.RESULT_MODAL_CLOSE);
    this.$resultModalReset = $(ID_SELECTOR.RESULT_MODAL_RESET);
    this.$resultModalProfitRatio = $(ID_SELECTOR.RESULT_MODAL_PROFIT_RATIO);
    this.$pickedNumberInputs = $$(CLASS_SELECTOR.PICKED_NUMBER_INPUT);
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

  bindInput() {
    this.$pickedNumberInputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        this.#moveFocusHandler(input, index);
      });
    });
  }

  #moveFocusHandler($element, index) {
    if ($element.value.length === 2 && index !== LOTTO_RULE.NUMBERS_COUNT) {
      this.$pickedNumberInputs[index + 1].focus();
    }
  }

  displayPickedNumbersForm() {
    this.$pickedNumbersForm.classList.add(CLASS_SELECTOR.PICKED_NUMBERS_FORM_DISPLAY);
  }

  displayNonePickedNumbersForm() {
    this.$pickedNumbersForm.classList.remove(CLASS_SELECTOR.PICKED_NUMBERS_FORM_DISPLAY);
  }

  displayResultModal() {
    this.$resultModalBackground.classList.add(CLASS_SELECTOR.OPEN);
  }

  displayNoneResultModal() {
    this.$resultModalBackground.classList.remove(CLASS_SELECTOR.OPEN);
  }

  clearInputs() {
    this.$pickedNumberInputs.forEach(input => (input.value = ''));
  }

  showLottoResult(winningLottoQuantity, profitRatio) {
    this.$resultModalBackground.classList.add(CLASS_SELECTOR.OPEN);
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
