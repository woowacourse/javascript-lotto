import { $, $$, clearInputValue } from '../utils/dom.js';
import { isEmptyValue, isInRange } from '../utils/common.js';
import { ERROR_MESSAGE } from '../utils/message.js';
import { LOTTO } from '../utils/constants.js';

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

  onClickButton() {
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
