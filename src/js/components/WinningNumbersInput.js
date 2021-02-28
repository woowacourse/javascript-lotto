import { store } from '../index.js';
import { calculateProfit, decideWinner } from '../redux/action.js';
import { PURCHASE_TYPE } from '../utils/constants.js';
import { $, $$, clearInputValue } from '../utils/dom.js';
import Button from './Button/Button.js';
import Component from '../core/Component.js';
import Input from './Input/Input.js';
import LottoNumbersInput from './Input/LottoNumbersInput.js';

export default class WinningNumbersInput extends Component {
  initRender() {
    this.$target.innerHTML = `
          <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
          <div class="d-flex flex-col">
            
            <div class="d-flex number-input-container">
              <div class="winning-number-container d-flex flex-col flex-grow">
                  <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                  ${new LottoNumbersInput({
                    classes: ['winning-number', 'mx-1', 'text-center'],
                  }).getTemplate()}
              </div>
              <div class="bonus-number-container d-flex flex-col flex-grow">
                <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                <div class="d-flex justify-center">
                ${new Input({
                  type: 'number',
                  classes: ['bonus-number', 'text-center'],
                  maxlength: 2,
                }).getTemplate()}
                </div>
              </div>
            </div>
            <p data-section="messageBox" class="text-xs text-center"></p>
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
          }).getTemplate()}
    `;
  }

  selectDOM() {
    this.$openResultModalButton = $('.open-result-modal-button');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');
    this.$messageBox = $('[data-section=messageBox]', this.$target);
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
    const [text, result] = LottoNumbersInput.validateLottoNumbersInputValue([
      ...winningNumbers,
      bonusNumber,
    ]);

    this.$messageBox.textContent = text;
    if (result === 'success') {
      this.$messageBox.style.color = 'green';
      this.$openResultModalButton.disabled = false;
    } else if (result === 'error') {
      this.$messageBox.style.color = 'red';
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

  clearView() {
    this.hideWinningNumbersInputView();
    this.$winningNumberInputs.forEach(clearInputValue);
    this.$openResultModalButton.disabled = true;
    this.clearMessageBox();
    clearInputValue(this.$bonusNumberInput);
  }

  displayWinningNumbersInputView() {
    this.$target.classList.remove('d-none');
  }

  hideWinningNumbersInputView() {
    this.$target.classList.add('d-none');
  }

  clearMessageBox() {
    this.$messageBox.textContent = '';
  }

  render(prevStates, states) {
    if (states.lottos.length === 0) {
      this.clearView();
      return;
    }

    if (
      prevStates.lottos !== states.lottos &&
      states.purchaseType === PURCHASE_TYPE.AUTO
    ) {
      this.displayWinningNumbersInputView();
    }

    if (prevStates.winningCount !== states.winningCount) {
      this.clearMessageBox();
    }
  }
}
