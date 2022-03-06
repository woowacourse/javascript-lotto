import Component from '../abstracts/component';
import { WINNING_NUM_PLACEHOLDER } from '../constants';
import { toInt } from '../utils';

class WinningNumberInput extends Component {
  constructor() {
    super();
    this.order = toInt(this.getAttribute('data-order'));
    this.valueAttr = this.getAttribute('data-value');
    this.isFocus = this.getAttribute('data-is-focus') !== null;
    this.maxLength = 2;
  }

  get valueAsNumber() {
    return toInt(this.value, WINNING_NUM_PLACEHOLDER);
  }

  get value() {
    return this.$input.value;
  }

  get length() {
    return this.value.length;
  }

  focus() {
    this.$input.focus();
  }

  template(value, maxLength) {
    return `<input class="form-control" value="${value}" maxlength="${maxLength}" />`;
  }

  setEvent() {
    this.addEvent('input', 'input', (event) => {
      const { target } = event;
      // 0이상의 정수만 허용한다
      // 복붙 및 드레그를 허용하지 않는다
      target.value = target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    });
  }

  shouldSubscribe() {
    return false;
  }

  isFull() {
    return this.length >= this.maxLength;
  }

  clear() {
    this.$input.value = WINNING_NUM_PLACEHOLDER;
    this.$input.backgroundColor = 'white';
  }

  render() {
    this.innerHTML = this.template(this.valueAttr, this.maxLength);
    this.$input = this.querySelector('input');
    if (this.isFocus) {
      this.$input.focus();
    }
  }
}

customElements.define('winning-number-input', WinningNumberInput);

export default WinningNumberInput;
