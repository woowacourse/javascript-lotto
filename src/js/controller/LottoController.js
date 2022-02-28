import LottoBundle from '../model/LottoBundle.js';
import validateMoney from '../validator/moneyValidator.js';
import IssuedTicketView from '../view/IssuedTicketView.js';
import PurchaseView from '../view/PurchaseView.js';
import { on } from '../utils/event.js';
import LOTTO from '../constants/lotto.js';
import CUSTOM_EVENT from '../constants/event.js';

export default class LottoController {
  constructor() {
    this.model = new LottoBundle();
    this.purchaseView = new PurchaseView();
    this.issuedTicketView = new IssuedTicketView();
  }

  subscribeViewEvents() {
    on(this.purchaseView.$purchaseForm, CUSTOM_EVENT.SUBMIT, (e) =>
      this.purchaseLotto(e.detail.money),
    );

    on(this.issuedTicketView.$lottoNumberToggle, CUSTOM_EVENT.TOGGLE, (e) =>
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
    this.issuedTicketView.showTicketContainer();
    this.issuedTicketView.renderTicketCount(count);
    this.issuedTicketView.renderIssuedTickets(this.model.lottos);
    this.purchaseView.deactivatePurchaseForm();
  }

  toggleDetails(checked) {
    if (checked) {
      this.issuedTicketView.showTicketDetails();
      return;
    }

    this.issuedTicketView.hideTicketDetails();
  }
}
