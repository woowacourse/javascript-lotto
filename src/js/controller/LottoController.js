import LottoBundle from '../model/LottoBundle.js';
import { $ } from '../utils/selector.js';
import { validateMoney } from '../validator/moneyValidator.js';
import IssuedTicketView from '../view/IssuedTicketView.js';
import PurchaseView from '../view/PurchaseView.js';

export default class LottoController {
  constructor() {
    this.model = new LottoBundle();
    this.purchaseView = new PurchaseView();
    this.issuedTicketView = new IssuedTicketView();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    $('#purchase-form').addEventListener(
      'submit',
      this.purchaseFormHandler.bind(this),
    );
    $('#lotto-number-toggle').addEventListener(
      'click',
      this.toggleHandler.bind(this),
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
      this.issuedTicketView.renderTicketContainer();
      this.issuedTicketView.renderTicketCount(count);
      this.issuedTicketView.renderTicketIcon(this.model.lottos);
      this.issuedTicketView.hideTicketDetails();
    } catch (error) {
      alert(error.message);
    }
  }

  toggleHandler(e) {
    if (e.target.checked) {
      this.issuedTicketView.showTicketDetails();
      return;
    }
    this.issuedTicketView.hideTicketDetails();
  }
}
