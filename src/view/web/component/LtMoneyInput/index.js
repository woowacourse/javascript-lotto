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
      this.setValidation(error.message);
      return;
    }
    this.setValidation(null);
    this.#money = money;
    this.dispatchEvent(new CustomEvent('change'));
  }

  setValidation(message) {
    super.setValidation(message);
    this.$input.setErrorMessage(message);
  }

  formResetCallback() {
    this.setMoney(null);
    this.setValidation(null);
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
}

export default LtMoneyInput;
