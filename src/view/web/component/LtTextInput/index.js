import LtFormControl from '../LtFormControl';
import template from './index.html';

class LtTextInput extends LtFormControl {
  /** @type {HTMLInputElement} */
  $input;

  /** @type {string} */
  #value;

  static get observedAttributes() {
    return ['placeholder', 'error-message'];
  }

  set errorMessage(message) {
    this.setAttribute('error-message', message || '');
  }

  get value() {
    return this.#value ?? '';
  }

  set value(value) {
    this.$input.value = value;
    this.#validate(value);
  }

  #validate(value) {
    this.#value = value ?? '';
    this.dispatchEvent(new CustomEvent('change'));
  }

  getRenderContent() {
    return template;
  }

  render() {
    super.render();

    this.$input.value = this.value;
    this.$input.addEventListener('change', (event) => {
      this.#validate(event.target.value);
    });
  }
}

export default LtTextInput;
