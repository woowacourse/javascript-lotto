import './WinningNumbersInputField.css';
import './NumberInputField.js';

const WINNING_NUMBERS_INPUT_FIELD = `
  <p class="lotto-body">당첨 번호</p>
  <section class="winning-numbers-input-container">
    <number-input-field></number-input-field>
    <number-input-field></number-input-field>
    <number-input-field></number-input-field>
    <number-input-field></number-input-field>
    <number-input-field></number-input-field>
    <number-input-field></number-input-field>    
  </section>
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
