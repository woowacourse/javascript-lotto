import {
  TICKET_MIN_NUMBER,
  TICKET_MAX_NUMBER,
  TICKET_NUMBERS_LENGTH,
} from '../lib/constants/lotto.js';
import { getWinningNumbers } from '../lib/utils/lotto.js';
import {
  DUPLICATE_WINNING_NUMBER,
  INPUT_NOT_COMPLETED,
  EXCEED_RANGE_NUMBER,
} from '../lib/constants/alertMessage.js';
import Component from '../lib/core/Component.js';
import { $ } from '../lib/utils/dom.js';

export default class WinningNumberForm extends Component {
  mountTemplate() {
    this.$target.innerHTML = `
      <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
      <div class="d-flex">
        <div>
          <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
          <div>
            ${['first', 'second', 'third', 'fourth', 'fifth', 'sixth'].reduce(
              (acc, name) => acc + this.createInput(name),
              ''
            )}
          </div>
        </div>
        <div class="bonus-number-container flex-grow">
          <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
          <div class="d-flex justify-center">
            <input type="number" class="bonus-number text-center" name="bonus"/>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="open-result-modal-button mt-5 btn btn-cyan w-100"
        id="result-button"
      >
        결과 확인하기
      </button>
    `;
  }

  createInput(name) {
    return `
      <input
        type="number"
        class="winning-number mx-1 text-center"
        name="${name}"
      />
    `;
  }

  initEvent() {
    this.$target.addEventListener(
      'keyup',
      this.handleWinningNumberInput.bind(this)
    );

    this.$target.addEventListener('submit', this.handleSumbit.bind(this));
  }

  handleWinningNumberInput({ target }) {
    if (!target.classList.contains('winning-number')) return;

    if (target.value && !this.isValidRange(Number(target.value))) {
      alert(EXCEED_RANGE_NUMBER);
      target.value = '';
    }

    this.focus(target);
  }

  isValidRange(value) {
    return value >= TICKET_MIN_NUMBER && value <= TICKET_MAX_NUMBER;
  }

  focus(target) {
    const MAX_DIGIT = 2;

    if (target.value.length === MAX_DIGIT && target.name !== 'sixth') {
      target.nextElementSibling.focus();
    }

    if (target.value.length === MAX_DIGIT && target.name === 'sixth') {
      $('.bonus-number[name=bonus]').focus();
    }
  }

  handleSumbit(event) {
    const winningNumber = getWinningNumbers(event.target.elements);

    event.preventDefault();

    if (!this.isValid(winningNumber)) {
      this.alertByCase(winningNumber);
      return;
    }

    this.props.winningNumber.set(winningNumber);
    this.props.open.set(true);
    this.clearInputs(event.target.elements);
  }

  isValid(winningNumber) {
    const uniqueNumberSize = new Set([
      ...winningNumber.main,
      winningNumber.bonus,
    ]).size;

    return (
      this.props.tickets.get().length &&
      winningNumber.main.every(number => Number.isInteger(number)) &&
      Number.isInteger(winningNumber.bonus) &&
      uniqueNumberSize === TICKET_NUMBERS_LENGTH + 1
    );
  }

  alertByCase(winningNumber) {
    const uniqueNumberSize = new Set([
      ...winningNumber.main,
      winningNumber.bonus,
    ]).size;

    if (
      !this.props.tickets.get().length ||
      winningNumber.main.some(number => Number.isNaN(number)) ||
      Number.isNaN(winningNumber.bonus)
    ) {
      alert(INPUT_NOT_COMPLETED);
      return;
    }

    if (uniqueNumberSize < TICKET_NUMBERS_LENGTH) {
      alert(DUPLICATE_WINNING_NUMBER);
    }
  }

  clearInputs({ first, second, third, fourth, fifth, sixth, bonus }) {
    [first, second, third, fourth, fifth, sixth, bonus].forEach(element => {
      element.value = '';
    });
  }
}
