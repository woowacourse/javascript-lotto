import View from './View.js';

import { RULES } from '../constants/index.js';
import { convertToNumber } from '../utils/common.js';
import { validateWinningNumberList } from './validator.js';

//template
const INPUT_ELEMENT = `<input type="text" class="winning-number-input" maxlength='2'/>`;

const WINNING_NUMBER_FORM = `
  <form id="winning-number-form">
    <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
    <div id="winning-number-boxes">
      <div id="win-number-box">
        <p>당첨 번호</p>
        <div class="input-box">
        ${INPUT_ELEMENT.repeat(RULES.LOTTO_NUMS)}
        </div>
      </div>
      <div id="bonus-number-box">
        <p>보너스 번호</p>
        <div class="input-box">
          ${INPUT_ELEMENT}
        </div>
      </div>
    </div>
    <button id="result-button" type="submit">결과 확인하기</button>
  </form>
`;

//class
export default class InputWinningNumberView extends View {
  constructor() {
    super();

    this.app = document.getElementById('app');
    this.winningNumberContainer = document.getElementById(
      'winning-number-container',
    );
    this.modal = document.getElementById('lotto-result-modal');
  }

  renderWinningNumberForm() {
    this.winningNumberContainer.insertAdjacentHTML(
      'beforeend',
      WINNING_NUMBER_FORM,
    );

    this.registerWinningNumberFormEvent();
    this.registerWinningNumbersInputsEvent();
  }

  registerWinningNumberFormEvent() {
    const winningNumberForm = document.getElementById('winning-number-form');
    winningNumberForm.addEventListener(
      'submit',
      this.handleWinningNumberFormSubmit.bind(this),
    );
  }

  handleWinningNumberFormSubmit(e) {
    e.preventDefault();

    const winningNumbers = Array.from(this.winningNumberInputs).map(input =>
      input.value === '' ? null : convertToNumber(input.value),
    );

    try {
      validateWinningNumberList(winningNumbers);
      this.handlers
        .get('winningNumberSubmit')
        .forEach(func => func(winningNumbers));
      this.showModal();
    } catch (error) {
      this.resetInputElementsValue();
      alert(error);
    }
  }

  registerWinningNumbersInputsEvent() {
    this.winningNumberInputs = document.querySelectorAll(
      '.winning-number-input',
    );
    this.winningNumberInputs.forEach((inputElement, index) => {
      inputElement.addEventListener('input', () =>
        this.handleWinningNumberInputFocus(inputElement, index),
      );
    });
  }

  handleWinningNumberInputFocus(inputElement, index) {
    if (inputElement.value.length !== 2) {
      return;
    }

    if (index === RULES.WINNING_LOTTO_NUMS - 1) {
      return;
    }

    this.winningNumberInputs[index + 1].focus();
  }

  showModal() {
    this.modal.classList.replace('hide', 'show');
  }

  resetInputElementsValue() {
    this.winningNumberInputs.forEach(input => (input.value = ''));
  }

  resetScreen() {
    this.winningNumberContainer.removeChild(
      this.winningNumberContainer.lastElementChild,
    );
  }
}
