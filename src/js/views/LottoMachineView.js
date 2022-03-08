import { $ } from '../utils/util';

import ChargeSubmitFormView from './ChargeSubmitFormView';
import PurchasedTicketListSectionView from './PurchasedTicketListSectionView';
import WinningResultModalView from './WinningResultModalView';
import WinningNumberSubmitFormView from './WinningNumberSubmitFormView';

export default class LottoMachineView {
  #app;

  #chargeSubmitFormView;

  #purchasedTicketListSectionView;

  #winningNumberSubmitFormView;

  #winningResultModalView;

  constructor() {
    this.#app = $('#app');
    this.#chargeSubmitFormView = new ChargeSubmitFormView(this.#app);
    this.#purchasedTicketListSectionView = new PurchasedTicketListSectionView(this.#app);
    this.#winningNumberSubmitFormView = new WinningNumberSubmitFormView(this.#app);
    this.#winningResultModalView = new WinningResultModalView(this.#app);
  }

  get app() { return this.#app; }

  initialize(lottos) {
    this.#chargeSubmitFormView.initialize();
    this.#purchasedTicketListSectionView.initialize(lottos);
    this.#winningNumberSubmitFormView.initialize();
    this.#winningResultModalView.initialize();
  }

  updateOnPurchase(tickets, charge) {
    this.#chargeSubmitFormView.updateOnPurchase(tickets, charge);
    this.#purchasedTicketListSectionView.updateOnPurchase(tickets);
    this.#winningNumberSubmitFormView.updateOnPurchase(tickets);
  }

  updateOnCheckWinningResult(winningResult) {
    this.#winningResultModalView.updateOnCheckWinningResult(winningResult);
  }
}
