import LottoBundle from '../model/LottoBundle.js';
import { $ } from '../utils/selector.js';
import { validateMoney } from '../validator/moneyValidator.js';
import PurchaseView from '../view/PurchaseView.js';

export default class LottoController {
  constructor() {
    this.model = new LottoBundle();
    this.purchaseView = new PurchaseView();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    $('#purchase-form').addEventListener(
      'submit',
      this.purchaseFormHandler.bind(this),
    );
  }

  purchaseFormHandler(e) {
    e.preventDefault();

    const money = this.purchaseView.getMoneyToPurchase();

    try {
      validateMoney(money);
      const count = money / 1000;
      this.model.createLottoBundle(count);
      console.log(this.model.lottos);
      // TODO : 구매한 lotto들을 보여준다. (view)
    } catch (error) {}
  }
}
