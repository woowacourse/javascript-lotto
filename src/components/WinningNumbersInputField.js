import './WinningNumbersInputField.css';
import './NumberInputField.js';

const WINNING_NUMBERS_INPUT_FIELD = `
  <div class="winning-numbers-title-container">
    <p class="lotto-body">당첨 번호</p>
  </div>
  <div class="winning-numbers-input-container">
    <number-input-field></number-input-field>
    <number-input-field></number-input-field>
    <number-input-field></number-input-field>
    <number-input-field></number-input-field>
    <number-input-field></number-input-field>
    <number-input-field></number-input-field>    
  </div>
`;

class WinningNumbersInputField extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = WINNING_NUMBERS_INPUT_FIELD;
  }
}

customElements.define('winning-numbers-input-field', WinningNumbersInputField);
