import Component from '../core/Component.js';
import { calculateProfit, decideWinner } from '../redux/action.js';
import { isEmptyValue, isInRange } from '../utils/common.js';
import { LOTTO } from '../utils/constants.js';
import { $, $$, clearInputValue } from '../utils/dom.js';
import { ERROR_MESSAGE } from '../utils/message.js';
import { store } from './App.js';
import Button from './Button/Button.js';
import Input from './Input/Input.js';

export default class WinningNumbersInput extends Component {
  mainTemplate() {
    return `
          <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
          <div class="d-flex flex-col">
            <div class="d-flex number-input-container">
              <div class="winning-number-container d-flex flex-col flex-grow">
                  <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                  <div>
                  ${new Input({
                    type: 'number',
                    classes: ['winning-number', 'mx-1', 'text-center'],
                  }).mainTemplate()}
                  ${new Input({
                    type: 'number',
                    classes: ['winning-number', 'mx-1', 'text-center'],
                  }).mainTemplate()}
                  ${new Input({
                    type: 'number',
                    classes: ['winning-number', 'mx-1', 'text-center'],
                  }).mainTemplate()}
                  ${new Input({
                    type: 'number',
                    classes: ['winning-number', 'mx-1', 'text-center'],
                  }).mainTemplate()}
                  ${new Input({
                    type: 'number',
                    classes: ['winning-number', 'mx-1', 'text-center'],
                  }).mainTemplate()}
                  ${new Input({
                    type: 'number',
                    classes: ['winning-number', 'mx-1', 'text-center'],
                  }).mainTemplate()}
                  </div>
              </div>
              <div class="bonus-number-container d-flex flex-col flex-grow">
                <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                <div class="d-flex justify-center">
                ${new Input({
                  type: 'number',
                  classes: ['bonus-number', 'text-center'],
                }).mainTemplate()}
                </div>
              </div>
            </div>
            <p data-section="winningInputMessage" class="text-xs text-center"></p>
          </div>
          ${new Button({
            type: 'button',
            classes: [
              'open-result-modal-button',
              'mt-5',
              'btn',
              'btn-cyan',
              'w-100',
            ],
            disabled: true,
            text: '결과 확인하기',
          }).mainTemplate()}
    `;
  }

  selectDOM() {
    this.$openResultModalButton = $('.open-result-modal-button');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');
    this.$winningInputMessage = $('[data-section=winningInputMessage]');
  }

  setup() {
    store.subscribe(this.render.bind(this));
  }

  onMoveCursorToNextInput({ target }) {
    if (target.value.length > 1) {
      target.value = target.value.slice(0, 2);
      (target.nextElementSibling
        ? target.nextElementSibling
        : this.$bonusNumberInput
      ).focus();
    }
  }

  onKeyUpNumberInput(e) {
    this.onMoveCursorToNextInput(e);
    const winningNumbers = Array.from(this.$winningNumberInputs).map(input =>
      input.value === '' ? '' : Number(input.value),
    );
    const bonusNumber =
      this.$bonusNumberInput.value === ''
        ? ''
        : Number(this.$bonusNumberInput.value);
    const [text, result] = this.validateWinningNumbersInputValue(
      winningNumbers,
      bonusNumber,
    );

    this.$winningInputMessage.textContent = text;
    if (result === 'success') {
      this.$winningInputMessage.style.color = 'green';
      this.$openResultModalButton.disabled = false;
    } else if (result === 'error') {
      this.$winningInputMessage.style.color = 'red';
      this.$openResultModalButton.disabled = true;
    }
  }

  onClickResultButton() {
    const winningNumbers = this.$winningNumberInputs.map(({ value }) => value);
    const bonusNumber = this.$bonusNumberInput.value;
    store.dispatch(
      decideWinner(winningNumbers.map(Number), Number(bonusNumber)),
    );
    store.dispatch(calculateProfit());
  }

  bindEvent() {
    this.$openResultModalButton.addEventListener(
      'click',
      this.onClickResultButton.bind(this),
    );
    this.$winningNumberInputs.forEach($elem =>
      $elem.addEventListener('keyup', this.onKeyUpNumberInput.bind(this)),
    );
    this.$bonusNumberInput.addEventListener(
      'keyup',
      this.onKeyUpNumberInput.bind(this),
    );
  }

  validateWinningNumbersInputValue = (winningNumbers, bonusNumber) => {
    const numbers = [...winningNumbers, bonusNumber].map(Number);
    if (winningNumbers.some(isEmptyValue) || isEmptyValue(bonusNumber)) {
      return [ERROR_MESSAGE.EMPTY_INPUT_NUMBER, 'error'];
    }
    if (
      !numbers.every(number => isInRange(number, LOTTO.MIN_NUM, LOTTO.MAX_NUM))
    ) {
      return [ERROR_MESSAGE.OUT_OF_RANGE, 'error'];
    }
    if (new Set(numbers).size !== numbers.length) {
      return [ERROR_MESSAGE.DUPLICATED_NUMBER, 'error'];
    }
    return [ERROR_MESSAGE.VALID_INPUT_NUMBER, 'success'];
  };

  render(prevStates, states) {
    // fail case
    if (states === undefined) {
      this.$target.innerHTML = this.mainTemplate();
      return;
    }

    if (states.lottos.length === 0) {
      this.$target.classList.add('d-none');
      this.$winningNumberInputs.forEach(clearInputValue);
      clearInputValue(this.$bonusNumberInput);
      return;
    }

    // success case
    if (prevStates.lottos !== states.lottos) {
      this.$target.classList.remove('d-none');
    }

    if (prevStates.winningCount !== states.winningCount) {
      this.$winningInputMessage.textContent = '';
    }
  }
}
