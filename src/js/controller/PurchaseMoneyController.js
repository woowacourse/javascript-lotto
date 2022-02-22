import { pickLottoNumber } from '../util/index.js';
import PurchaseMoneyView from '../view/purchaseMoneyView.js';

export default class PurchaseMoneyController {
  constructor() {
    this.view = new PurchaseMoneyView();
    this.setEventHandler();
  }

  setEventHandler() {
    this.view.addSubmitEvent(this.onSubmitHandler.bind(this));
  }

  onSubmitHandler(money) {
    console.log(money);
    console.log('pickLottoNumber', pickLottoNumber(6));
  }
}
