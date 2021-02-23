import LottoManager from '../model/LottoManager.js';
import { $, $$, clearInputValue } from '../utils/dom.js';

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
  }

  setup() {
    ({ lottoManager: this.lottoManager } = this.props);
    this.lottoManager.subscribe(this.render.bind(this));
  }

  onKeyUpNumberInput(e) {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 2);
      if (e.target.nextElementSibling) e.target.nextElementSibling.focus();
      else {
        this.$bonusNumberInput.focus();
      }
    }

    const winningNumbers = Array.from(this.$winningNumberInputs).map(input =>
      Number(input.value),
    );
    const bonusNumber = Number(this.$bonusNumberInput.value);
    if (
      LottoManager.validateWinningNumbersInputValue(winningNumbers, bonusNumber)
    ) {
      this.$openResultModalButton.disabled = false;
    } else {
      this.$openResultModalButton.disabled = true;
    }
  }

  onClickButton() {
    const winningNumbers = this.$winningNumberInputs.map(({ value }) => value);
    const bonusNumber = this.$bonusNumberInput.value;

    const errorMessage = LottoManager.validateWinningNumbersInputValue(
      winningNumbers,
      bonusNumber,
    );
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    this.lottoManager.decideWinners(
      winningNumbers.map(Number),
      Number(bonusNumber),
    );
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
    if (this.lottoManager.lottos.length) {
      this.$target.classList.remove('d-none');
    } else {
      this.$target.classList.add('d-none');
      this.$winningNumberInputs.forEach(clearInputValue);
      clearInputValue(this.$bonusNumberInput);
    }
  }
}
