import { isEmptyValue, isInRange } from '../../utils/common.js';
import { LOTTO } from '../../utils/constants.js';
import { ERROR_MESSAGE } from '../../utils/message.js';
import Input from './Input.js';

export default class LottoNumbersInput {
  constructor({ id, classes = [], type = 'number', placeholder = '' }) {
    this.id = id;
    this.classes = classes;
    this.type = type;
    this.placeholder = placeholder;
  }

  getTemplate() {
    return `<div class="lotto-number-input-wrapper">
    ${new Input({ type: this.type, classes: this.classes })
      .getTemplate()
      .repeat(6)}
      </div>`;
  }

  static validateLottoNumbersInputValue = numbers => {
    numbers = numbers.map(Number);
    if (numbers.some(isEmptyValue)) {
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
}
