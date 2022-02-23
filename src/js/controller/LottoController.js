import LottoBundle from '../model/LottoBundle.js';
import validateMoney from '../validator/moneyValidator.js';
import IssuedTicketView from '../view/IssuedTicketView.js';
import PurchaseView from '../view/PurchaseView.js';
import { on } from '../utils/event.js';

export default class LottoController {
  constructor() {
    this.model = new LottoBundle();
    this.purchaseView = new PurchaseView();
    this.issuedTicketView = new IssuedTicketView();
    this.subscribeViewEvents();
  }

  subscribeViewEvents() {
    on(this.purchaseView.$purchaseForm, '@submit', (e) =>
      this.purchaseLotto(e.detail.money),
    );

    on(this.issuedTicketView.$lottoNumberToggle, '@toggle', (e) =>
      this.toggleDetails(e.detail.checked),
    );
  }

  purchaseLotto(money) {
    try {
      validateMoney(money);
      const count = money / 1000;
      this.model.createLottoBundle(count);
      this.issuedTicketView.renderTicketContainer();
      this.issuedTicketView.renderTicketCount(count);
      this.issuedTicketView.renderTicketIcon(this.model.lottos);
      this.issuedTicketView.hideTicketDetails();
      this.purchaseView.deactivatePurchase();
    } catch (error) {
      alert(error.message);
    }
  }

  toggleDetails(checked) {
    if (checked) {
      this.issuedTicketView.showTicketDetails();
      return;
    }

    this.issuedTicketView.hideTicketDetails();
  }
}
