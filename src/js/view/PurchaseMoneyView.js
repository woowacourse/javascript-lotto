export default class PurchaseMoneyView {
  constructor() {
    this.initDom();
  }

  initDom() {
    this.form = document.getElementById('purchase-money-form');
    this.input = document.getElementById('purchase-money-input');
  }

  addSubmitEvent(submitHandler) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();

      const money = this.input.value;
      submitHandler(money);
    });
  }
}
