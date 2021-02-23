import LottoManager from '../model/LottoManager.js';
import { $, $$, clearInputValue } from '../utils/dom.js';
import { lottoManager } from './App.js';

export default class WinningNumbersInput {
  constructor(props) {
    this.props = props;
    this.$target = $('#lotto-winning-number-input-container');
    this.setup();
    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.$openResultModalButton = $('.open-result-modal-button');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');
    this.$winningInputMessage = $('[data-section=winningInputMessage]');
  }

  setup() {
    lottoManager.subscribe(this.render.bind(this));
  }

  onCursorMoveNextInput({ target }) {
    if (target.value.length > 1) {
      target.value = target.value.slice(0, 2);
      if (target.nextElementSibling) target.nextElementSibling.focus();
      else {
        this.$bonusNumberInput.focus();
      }
    }
  }

  onKeyUpNumberInput(e) {
    this.onCursorMoveNextInput(e);
    const winningNumbers = Array.from(this.$winningNumberInputs).map(input =>
      Number(input.value),
    );
    const bonusNumber = Number(this.$bonusNumberInput.value);
    const [text, result] = LottoManager.validateWinningNumbersInputValue(
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

  onClickButton() {
    const winningNumbers = this.$winningNumberInputs.map(({ value }) => value);
    const bonusNumber = this.$bonusNumberInput.value;

    lottoManager.decideWinners(winningNumbers.map(Number), Number(bonusNumber));
    this.$winningInputMessage.textContent = '';
  }

  bindEvent() {
    this.$openResultModalButton.addEventListener(
      'click',
      this.onClickButton.bind(this),
    );
    this.$winningNumberInputs.forEach($elem =>
      $elem.addEventListener('keyup', this.onKeyUpNumberInput.bind(this)),
    );
    this.$bonusNumberInput.addEventListener(
      'keyup',
      this.onKeyUpNumberInput.bind(this),
    );
  }

  render() {
    if (lottoManager.lottos.length) {
      this.$target.classList.remove('d-none');
    } else {
      this.$target.classList.add('d-none');
      this.$winningNumberInputs.forEach(clearInputValue);
      clearInputValue(this.$bonusNumberInput);
    }
  }
}
