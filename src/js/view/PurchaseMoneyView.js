export default class PurchaseMoneyView {
  constructor() {
    this.initDom();
  }

  initDom() {
    this.form = document.getElementById('purchase-money-form');
  }

  addSubmitEvent(submitHandler) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();

      submitHandler();
    });
  }
}
