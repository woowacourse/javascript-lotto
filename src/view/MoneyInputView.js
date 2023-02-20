class MoneyInputView {
  constructor() {
    this.form = document.getElementById('money-input-form');
    this.input = document.getElementById('money-input');
  }

  addSubmitHandler(submitHandler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const money = Number(this.input.value);
      submitHandler(money);
    });
  }
}

export default MoneyInputView;
