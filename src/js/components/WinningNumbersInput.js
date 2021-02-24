import { lottoManager } from './App.js';
import { $, $$, clearInputValue } from '../utils/dom.js';
import { isEmptyArray, isEmptyValue, isInRange } from '../utils/common.js';
import { ERROR_MESSAGE } from '../utils/message.js';
import { LOTTO } from '../utils/constants.js';

export default class WinningNumbersInput {
  constructor() {
    this.subscribeAction();
    this.selectDOM();
    this.bindEvent();
  }

  subscribeAction() {
    lottoManager.subscribe(this.render.bind(this));
  }

  selectDOM() {
    this.$target = $('#lotto-winning-number-input-container');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');
  }

  bindEvent() {
    this.$target.addEventListener('submit', e => {
      e.preventDefault();

      this.onShowWinningResult();
    });
  }

  onShowWinningResult() {
    const winningNumbers = this.$winningNumberInputs.map(({ value }) => value);
    const bonusNumber = this.$bonusNumberInput.value;

    const errorMessage = validateWinningNumbersInputValue(
      winningNumbers,
      bonusNumber,
    );
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    lottoManager.decideWinners(winningNumbers.map(Number), Number(bonusNumber));
  }

  render() {
    if (isEmptyArray(lottoManager.lottos)) {
      this.$target.classList.add('d-none');
      return;
    }

    this.$target.classList.remove('d-none');
    [...this.$winningNumberInputs, this.$bonusNumberInput].forEach(
      clearInputValue,
    );
  }
}

const validateWinningNumbersInputValue = (winningNumbers, bonusNumber) => {
  const numbers = [...winningNumbers, bonusNumber].map(Number);

  if (winningNumbers.some(isEmptyValue) || isEmptyValue(bonusNumber)) {
    return ERROR_MESSAGE.EMPTY_INPUT_NUMBER;
  }

  if (
    numbers.some(number => !isInRange(number, LOTTO.MIN_NUM, LOTTO.MAX_NUM))
  ) {
    return ERROR_MESSAGE.OUT_OF_RANGE;
  }

  if (new Set(numbers).size !== numbers.length) {
    return ERROR_MESSAGE.DUPLICATED_NUMBER;
  }

  return '';
};
