import './WinningAndBonusInputForm.css';
import './WinningNumbersInputField.js';
import './BonusNumberInputField.js';

const WINNING_NUMBERS_FORM = `
<div class="winning-bonus-container">
    <div class="winning-input-title-container">
      <p class="lotto-body">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
    </div>

    <div class="winning-bonus-input-container">
      <winning-numbers-input-field></winning-numbers-input-field>
      <bonus-number-input-field></bonus-number-input-field>
      
    </div>
</div>
<lotto-button id="result-button"></lotto-button>
`;

class WinningNumbersForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = WINNING_NUMBERS_FORM;
  }
}

customElements.define('winning-numbers-form', WinningNumbersForm);
