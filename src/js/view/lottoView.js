import CashInputView from './cashInputView';
import PurchasedLottoView from './purchasedLottoView';
import ResultModalView from './resultModalView';
import WinnerNumberView from './winnerNumberView';

class LottoView {
  constructor() {
    this.cashInputView = new CashInputView();
    this.purchasedLottoView = new PurchasedLottoView();
    this.winnerNumberView = new WinnerNumberView();
    this.resultModalView = new ResultModalView();

    this.deliverMessage = null;
  }

  assignMessenger(deliverMessage) {
    this.cashInputView.assignMessenger(deliverMessage);
    this.winnerNumberView.assignMessenger(deliverMessage);
  }

  renderLottos(lottos) {
    this.purchasedLottoView.renderLottos(lottos);
    this.winnerNumberView.render();
  }

  renderResultModal(results) {
    this.resultModalView.renderResultModal(results);
  }
}
export default LottoView;
