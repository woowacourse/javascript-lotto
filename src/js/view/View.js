export class View {
  constructor() {
    this.registerButtons();
    this.registerInput();
  }

  registerButtons() {
    this.purchaseBtn = document.getElementById('purchase-button');
  }

  registerInput() {
    this.moneyInput = document.getElementById('input-space');
  }
}
