import './WinningNumbersInputField.css';
import './NumberInputField.js';

const WINNING_NUMBERS_INPUT_FIELD = `
  <div class="winning-numbers-title-container">
    <p class="lotto-body">당첨 번호</p>
  </div>
  <div class="winning-numbers-input-container">
    <number-input-field id=number1></number-input-field>
    <number-input-field id=number2></number-input-field>
    <number-input-field id=number3></number-input-field>
    <number-input-field id=number4></number-input-field>
    <number-input-field id=number5></number-input-field>
    <number-input-field id=number6></number-input-field>    
  </div>
`;

class WinningNumbersInputField extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = WINNING_NUMBERS_INPUT_FIELD;
  }

  getValue() {
    const winningNumbers = [];
    const inputFields = this.querySelectorAll('number-input-field');
    inputFields.forEach((inputField) => {
      winningNumbers.push(inputField.getValue());
    });

    return winningNumbers;
  }
}

customElements.define('winning-numbers-input-field', WinningNumbersInputField);
