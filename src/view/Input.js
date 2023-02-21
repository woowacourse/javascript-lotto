class Input {
  constructor() {
    this.moneyInputEl = document.querySelector('.money_input');
    this.purchaseBtn = document.querySelector('.purchase_button');
  }

  purchaseLottos = (callback) => {
    this.purchaseBtn.addEventListener('click', () => {
      callback(this.moneyInputEl.value);
    });
  };
}

export default Input;
