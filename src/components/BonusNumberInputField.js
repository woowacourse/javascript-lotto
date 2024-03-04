import AppError from '../errors/AppError/AppError.js';
import './BonusNumberInputField.css';
import './NumberInputField.js';

const WINNING_NUMBERS_INPUT_FIELD = `
  <p class="lotto-body">보너스 번호</p>
  <div class="bonus-number-input-container">
    <number-input-field></number-input-field>  
  </div>
`;

class BonusNumberInputField extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = WINNING_NUMBERS_INPUT_FIELD;
  }

  getValue() {
    const inputField = this.querySelector('number-input-field');
    if (!inputField) {
      throw new AppError('"number-input-field"를 찾을 수 없습니다.');
    }
    return inputField.getValue();
  }
}

customElements.define('bonus-number-input-field', BonusNumberInputField);
