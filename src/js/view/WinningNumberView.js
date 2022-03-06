import { ID, CLASS } from '../constants/attribute.js';
import { WINNING_PRIZE } from '../constants/lotto.js';
import { REGEXP } from '../constants/regexp.js';
import { $, $$, addClassName, removeClassName, replaceHTML } from '../utils/dom';

export default class WinningNumberView {
  constructor() {
    this.#configureDOM();
    this.bindCloseModal();
    this.bindMoveFocus();
  }

  #configureDOM() {
    this.$pickedNumbersForm = $(ID.PICKED_NUMBERS_FORM);
    this.$resultModalBackground = $(ID.RESULT_MODAL_BACKGROUND);
    this.$resultModalGridContainer = $(ID.RESULT_MODAL_GRID_CONTAINER);
    this.$resultModalClose = $(ID.RESULT_MODAL_CLOSE);
    this.$resultModalReset = $(ID.RESULT_MODAL_RESET);
    this.$resultModalProfitRatio = $(ID.RESULT_MODAL_PROFIT_RATIO);
    this.$pickedNumberInputs = $$(CLASS.PICKED_NUMBER_INPUT);
    this.$body = document.querySelector('body');
  }

  bindCheckResult(handler) {
    this.$pickedNumbersForm.addEventListener('submit', event => {
      event.preventDefault();
      handler([...event.target.elements.pickedNumber].map(input => input.valueAsNumber));
    });
  }

  bindCloseModal() {
    this.$resultModalClose.addEventListener('click', () => {
      this.$resultModalBackground.classList.remove(CLASS.OPEN);
    });
  }

  bindRestart(handler) {
    this.$resultModalReset.addEventListener('click', () => {
      this.$pickedNumbersForm.classList.add(CLASS.PICKED_NUMBERS_FORM_DISPLAY_NONE);

      handler();
    });
  }

  bindClickModalOutside() {
    this.$resultModalBackground.addEventListener('click', this.displayNoneResultModal.bind(this));
  }

  bindMoveFocus() {
    this.$pickedNumberInputs.forEach(($input, index) => {
      $input.addEventListener('input', () => {
        this.#moveFocusHandler($input);
      });

      $input.addEventListener('keydown', e => {
        if (REGEXP.NOT_NUMBER_IN_NUMBER_INPUT.test(e.key)) {
          e.preventDefault();
          return;
        }
        if (e.target.value.length === 2 && REGEXP.NUMBER.test(e.key)) {
          e.preventDefault();
        }
      });

      $input.addEventListener('keyup', e => {
        if (e.key === 'Backspace' && $input.value.length === 0) {
          Array.from(this.$pickedNumberInputs)
            .slice(0, index)
            .reverse()
            .find($input => $input.value !== '')
            ?.focus();
        }
      });
    });
  }

  #moveFocusHandler($element) {
    if ($element.value.length === 2) {
      Array.from(this.$pickedNumberInputs)
        .find($input => $input.value === '')
        ?.focus();
    }
  }

  moveFocusOnWinningNumberInput() {
    this.$pickedNumberInputs[0].focus();
  }

  displayPickedNumbersForm() {
    addClassName(this.$pickedNumbersForm, CLASS.PICKED_NUMBERS_FORM_DISPLAY);
  }

  displayNonePickedNumbersForm() {
    removeClassName(this.$pickedNumbersForm, CLASS.PICKED_NUMBERS_FORM_DISPLAY);
  }

  displayResultModal() {
    addClassName(this.$resultModalBackground, CLASS.OPEN);
    addClassName(this.$body, CLASS.SCROLL_BLOCK);
  }

  displayNoneResultModal() {
    removeClassName(this.$resultModalBackground, CLASS.OPEN);
    removeClassName(this.$body, CLASS.SCROLL_BLOCK);
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
    `<div class="${CLASS.RESULT_MODAL_GRID_ITEM}">일치 개수</div>
    <div class="${CLASS.RESULT_MODAL_GRID_ITEM}">당첨금</div>
    <div class="${CLASS.RESULT_MODAL_GRID_ITEM}">당첨 갯수</div>` +
    Object.keys(WINNING_PRIZE)
      .map(
        key => `
        <div class="${CLASS.RESULT_MODAL_GRID_ITEM}">${key}</div>
        <div class="${CLASS.RESULT_MODAL_GRID_ITEM}">${WINNING_PRIZE[key].toLocaleString()}</div>
        <div class="${CLASS.RESULT_MODAL_GRID_ITEM}">${winningLottoQuantity[key]}개</div>
      `,
      )
      .join('')
  );
}
