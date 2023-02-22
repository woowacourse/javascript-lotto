import { toggleDisableAttribute } from '../utils/dom';

class MoneyInputView {
  constructor() {
    this.form = document.getElementById('money-input-form');
    this.button = document.querySelector('.buy-button');
    this.input = document.getElementById('money-input');
  }

  addSubmitHandler(submitHandler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const money = Number(this.input.value);
      submitHandler(money);
      this.toggleButton();
    });
  }

  toggleButton() {
    toggleDisableAttribute(this.input);
    toggleDisableAttribute(this.button);
    this.button.id = this.button.id !== 'disabled' && 'disabled';
  }

  clearInput() {
    this.input.value = '';
  }
}

export default MoneyInputView;
