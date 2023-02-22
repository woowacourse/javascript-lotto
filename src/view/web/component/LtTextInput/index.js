import LtFormControl from '../LtFormControl';
import template from './index.html';

class LtTextInput extends LtFormControl {
  /** @type {HTMLInputElement} */
  $input;

  /** @type {string} */
  #text = '';

  static get observedAttributes() {
    return ['type', 'min', 'max', 'step', 'placeholder'];
  }

  setErrorMessage(message) {
    this.dataset.errorMessage = message || '';
  }

  getText() {
    return this.#text;
  }

  setText(text) {
    this.$input.value = text;
    this.#validate(text);
  }

  #validate(text) {
    this.#text = text ?? '';
    this.dispatchEvent(new Event('change'));
  }

  getRenderContent() {
    return template;
  }

  render() {
    super.render();

    this.$input.value = this.#text;
    this.$input.addEventListener('change', (event) => {
      this.#validate(event.target.value);
    });
  }
}

export default LtTextInput;
