import { EVENT, RULES } from '../constants/index.js';
import { convertToNumber } from '../utils/common.js';
import { validateWinningNumberList } from './validator.js';
import { event } from '../utils/event.js';

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
export default class InputWinningNumberView {
  constructor() {
    this.app = document.getElementById('app');
    this.winningNumberContainer = document.getElementById(
      'winning-number-container',
    );
    this.modal = document.getElementById('lotto-result-modal');

    this.indexFactory = (() => {
      let index = 0;

      return {
        increment() {
          index++;
        },
        get index() {
          return index;
        },
      };
    })();
  }

  renderWinningNumberForm() {
    this.winningNumberContainer.insertAdjacentHTML(
      'beforeend',
      WINNING_NUMBER_FORM,
    );

    this.winningNumberForm = document.getElementById('winning-number-form');
    event.on(this.winningNumberForm, 'submit', e =>
      this.handleWinningNumberFormSubmit(e),
    );

    this.winningNumberInputs = document.querySelectorAll(
      '.winning-number-input',
    );

    this.winningNumberForm.addEventListener('input', e => {
      if (e.target.classList.contains('winning-number-input')) {
        this.handleWinningNumberInputFocus(e);
      }
    });
  }

  handleWinningNumberInputFocus(e) {
    const { target: input } = e;

    if (input.value.length !== 2) {
      return;
    }

    this.indexFactory.increment();
    let index = this.indexFactory.index;

    if (index < 7) {
      this.winningNumberInputs[index].focus();
    }
  }

  handleWinningNumberFormSubmit(e) {
    e.preventDefault();
    const winningNumbers = Array.from(this.winningNumberInputs).map(input =>
      input.value === '' ? null : convertToNumber(input.value),
    );

    try {
      validateWinningNumberList(winningNumbers);
      event.emit(this.winningNumberForm, EVENT.SUBMIT_WINNING_NUMBERS, {
        winningNumbers,
      });
      this.showModal();
    } catch (error) {
      this.resetInputElementsValue();
      alert(error);
    }
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
