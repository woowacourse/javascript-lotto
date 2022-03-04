import WinningResultSectionView from './WinningResultSectionView';
import PurchaseTicketSectionView from './PurchaseTicketSectionView';

export default class LottoMachineView {
  constructor() {
    this.purchaseTicketSectionView = new PurchaseTicketSectionView();
    this.winningResultSectionView = new WinningResultSectionView();
  }

  initialize(lottos) {
    this.purchaseTicketSectionView.initialize(lottos);
    this.winningResultSectionView.initialize();
  }

  updateOnPurchase(tickets, charge) {
    this.purchaseTicketSectionView.updateOnPurchase(tickets, charge);
    this.winningResultSectionView.updateOnPurchase(tickets);
  }

  updateOnCheckWinningResult(winningResult){
    this.winningResultSectionView.updateOnCheckWinningResult(winningResult);
  }
}
