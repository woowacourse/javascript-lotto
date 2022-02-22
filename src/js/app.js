import PurchaseMoneyController from './controller/PurchaseMoneyController.js';

export default class App {
  constructor() {
    this.init();
  }

  init() {
    this.purchaseMoneyController = new PurchaseMoneyController();
  }
}
