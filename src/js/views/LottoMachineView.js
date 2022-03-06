import WinningResultSectionView from './WinningResultSectionView';
import PurchaseTicketSectionView from './PurchaseTicketSectionView';
import { $ } from '../utils/util';

export default class LottoMachineView {
  #app;

  #purchaseTicketSectionView;

  #winningResultSectionView;

  constructor() {
    this.#app = $('#app');
    this.#purchaseTicketSectionView = new PurchaseTicketSectionView(this.#app);
    this.#winningResultSectionView = new WinningResultSectionView(this.#app);
  }

  get app() { return this.#app; }

  initialize(lottos) {
    this.#purchaseTicketSectionView.initialize(lottos);
    this.#winningResultSectionView.initialize();
  }

  updateOnPurchase(tickets, charge) {
    this.#purchaseTicketSectionView.updateOnPurchase(tickets, charge);
    this.#winningResultSectionView.updateOnPurchase(tickets);
  }

  updateOnCheckWinningResult(winningResult) {
    this.#winningResultSectionView.updateOnCheckWinningResult(winningResult);
  }
}
