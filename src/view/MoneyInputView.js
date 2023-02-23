import { toggleDisableAttribute } from '../utils/dom';

class MoneyInputView {
  constructor() {
    this.form = document.getElementById('money-input-form');
    this.button = document.querySelector('#buy-button');
    this.input = document.getElementById('money-input');
    this.input.focus();
  }

  addSubmitHandler(submitHandler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const money = Number(this.input.value);
      submitHandler(money);
    });
  }

  toggleFormDisable() {
    toggleDisableAttribute(this.input);
    toggleDisableAttribute(this.button);
  }

  clearInput() {
    this.input.value = '';
  }
}

export default MoneyInputView;
