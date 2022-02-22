import Lottos from '../model/Lottos.js';
import { invalidPurchaseMoney } from '../util/validator.js';
import PurchaseMoneyView from '../view/purchaseMoneyView.js';

export default class PurchaseMoneyController {
  constructor() {
    this.init();
    this.setEventHandler();
  }

  init() {
    this.view = new PurchaseMoneyView();
    this.model = new Lottos();
  }

  setEventHandler() {
    this.view.addSubmitEvent(this.onSubmitHandler.bind(this));
  }

  onSubmitHandler(purchaseMoney) {
    try {
      invalidPurchaseMoney(purchaseMoney);
    } catch (e) {
      return alert(e);
    }

    const lottoCount = purchaseMoney / 1000;
    this.model.makeLottos(lottoCount);
  }
}
