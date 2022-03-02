import InputValue from './InputValue.js';
import { $$ } from '../utils/index.js';

export default class WinningNumberValue extends InputValue {
  constructor() {
    super([...$$('.match-number-input')]);
  }

  getValue() {
    return this.$input.map(($numberInput) => $numberInput.value);
  }

  setValue(values) {
    this.$input.forEach(($numberInput, index) => {
      const $input = $numberInput;
      $input.value = values[index];
    });
  }

  focusInput(index) {
    if (index < this.$input.length) {
      this.$input[index].focus();
    }
  }
}
