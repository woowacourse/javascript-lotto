import PurchaseMoneyView from '../view/purchaseMoneyView.js';

export default class PurchaseMoneyController {
  constructor() {
    this.view = new PurchaseMoneyView();
    this.setEventHandler();
  }

  setEventHandler() {
    this.view.addSubmitEvent(this.onSubmitHandler.bind(this));
  }

  onSubmitHandler() {
    console.log('handler test');
  }
}
