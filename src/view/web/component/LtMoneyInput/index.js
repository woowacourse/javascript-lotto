import Validation from '../../../../Validation';
import { default as LtFormControl, default as LtTextInput } from '../LtFormControl';
import template from './index.html';

class LtMoneyInput extends LtFormControl {
  /** @type {LtTextInput} */
  $input;

  /** @type {number | null} */
  #value = null;

  static get observedAttributes() {
    return ['placeholder'];
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.$input.value = value;
    this.#validate(value);
  }

  #validate(value) {
    this.#value = null;
    const money = Number(value);
    try {
      Validation.validateMoney(value);
    } catch (error) {
      this.setValidation(error.message);
      return;
    }
    this.setValidation(null);
    this.#value = money;
    this.dispatchEvent(new CustomEvent('change'));
  }

  setValidation(message) {
    super.setValidation(message);
    this.$input.errorMessage = message;
  }

  formResetCallback() {
    this.value = null;
    this.setValidation(null);
  }

  getRenderContent() {
    return template;
  }

  render() {
    super.render();

    this.$input.value = this.#value;
    this.$input.addEventListener('change', (event) => {
      this.#validate(event.target.value);
    });
  }
}

export default LtMoneyInput;
