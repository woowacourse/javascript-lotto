import './PriceInputField.css';
import AppError from '../errors/AppError/AppError.js';

const PRICE_INPUT_FIELD = `
  <input class="price-input" type="number" placeholder="금액"></input>
`;

class PriceInputField extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = PRICE_INPUT_FIELD;
  }

  getValue() {
    const inputField = this.querySelector('.price-input');
    if (!inputField) {
      throw new AppError('".price-input"를 찾을 수 없습니다.');
    }
    return inputField.value;
  }
}

customElements.define('price-input-field', PriceInputField);
