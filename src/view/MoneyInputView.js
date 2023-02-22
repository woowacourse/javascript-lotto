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
      this.button.disabled = true;
      this.button.id = 'disabled';
    });
  }
}

export default MoneyInputView;
