import LottoBundle from '../model/LottoBundle.js';
import validateMoney from '../validator/moneyValidator.js';
import IssuedTicketView from '../view/IssuedTicketView.js';
import PurchaseView from '../view/PurchaseView.js';
import { on } from '../utils/event.js';
import LOTTO from '../constants/lotto.js';

export default class LottoController {
  constructor() {
    this.model = new LottoBundle();
    this.purchaseView = new PurchaseView();
    this.issuedTicketView = new IssuedTicketView();
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
      const count = money / LOTTO.PRICE_PER_TICKET;
      this.model.createLottoBundle(count);
      this.renderLotto(count);
    } catch (error) {
      alert(error.message);
    }
  }

  renderLotto(count) {
    this.issuedTicketView.renderTicketContainer();
    this.issuedTicketView.renderTicketCount(count);
    this.issuedTicketView.renderTicketIcon(this.model.lottos);
    this.issuedTicketView.hideTicketDetails();
    this.purchaseView.deactivatePurchase();
  }

  toggleDetails(checked) {
    if (checked) {
      this.issuedTicketView.showTicketDetails();
      return;
    }

    this.issuedTicketView.hideTicketDetails();
  }
}
