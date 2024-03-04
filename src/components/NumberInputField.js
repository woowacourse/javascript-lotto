import './NumberInputField.css';
import AppError from '../errors/AppError/AppError.js';

const NUMBER_INPUT_FIELD = `
  <input class="number-input" type="number"></input>
`;

class NumberInputField extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = NUMBER_INPUT_FIELD;
  }

  getValue() {
    const inputField = this.querySelector('.number-input');
    if (!inputField) {
      throw new AppError('".number-input"를 찾을 수 없습니다.');
    }
    return inputField.value;
  }
}

customElements.define('number-input-field', NumberInputField);
