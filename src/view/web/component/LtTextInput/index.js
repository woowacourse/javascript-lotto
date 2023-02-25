import LtFormControl from '../LtFormControl';
import template from './index.html';

class LtTextInput extends LtFormControl {
  /** @type {HTMLInputElement} */
  $input;

  /** @type {string} */
  #text = '';

  static get shadowRootOptions() {
    return { delegatesFocus: true };
  }

  static get observedAttributes() {
    return ['type', 'min', 'max', 'step', 'placeholder', 'autofocus'];
  }

  setErrorMessage(message = null) {
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

  onInput(event) {
    this.#validate(event.target.value);
  }

  getRenderContent() {
    return template;
  }

  render() {
    super.render();

    this.$input.value = this.#text;
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('autofocus', this.hasAttribute('autofocus'));
  }
}

export default LtTextInput;
