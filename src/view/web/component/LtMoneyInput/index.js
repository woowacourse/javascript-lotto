import Validation from '../../../../Validation';
import LtFormControl from '../LtFormControl';
import LtTextInput from '../LtTextInput';
import template from './index.html';

class LtMoneyInput extends LtFormControl {
  /** @type {LtTextInput} */
  $input;

  /** @type {number | null} */
  #money = null;

  getMoney() {
    return this.#money;
  }

  setMoney(text) {
    this.$input.setText(text);
    this.#validate(text);
  }

  #validate(text) {
    this.#money = null;
    const money = Number(text);
    try {
      Validation.validateMoney(text);
    } catch (error) {
      this.setValidation(false, error.message);
      return;
    }
    this.setValidation(true);
    this.#money = money;
    this.dispatchEvent(new CustomEvent('change'));
  }

  setValidation(valid, message) {
    super.setValidation(valid, message);
    this.$input.setErrorMessage(message);
  }

  formResetCallback() {
    this.setMoney(null);
    this.setValidation(false);
  }

  getRenderContent() {
    return template;
  }

  render() {
    super.render();

    this.$input.text = this.#money;
    this.$input.addEventListener('change', (event) => {
      this.#validate(event.target.getText());
    });
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.hasAttribute('required') && this.#money === null) {
      this.setValidation(false);
    }
  }
}

export default LtMoneyInput;
