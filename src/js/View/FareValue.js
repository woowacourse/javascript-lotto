import InputValue from './InputValue.js';
import { $ } from '../utils/index.js';

export default class FareValue extends InputValue {
  constructor() {
    super($('#fare-input'));
  }

  getValue() {
    return this.$input.value;
  }

  setValue(value) {
    this.$input.value = value;
  }

  focus() {
    this.$input.focus();
  }
}
