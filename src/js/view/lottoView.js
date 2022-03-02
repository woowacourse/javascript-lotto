import CashInputView from './cashInputView';
import PurchasedLottoView from './purchasedLottoView';
import ResultModalView from './resultModalView';
import WinnerNumberView from './winnerNumberView';

class LottoView {
  constructor() {
    this.cashInputView = new CashInputView();
    this.purchasedLottoView = new PurchasedLottoView();
    this.winnerNumberView = new WinnerNumberView();
    this.resultModalView = new ResultModalView(this.resetView);

    this.deliverMessage = null;
  }

  resetView = () => {
    this.cashInputView.resetView();
    this.purchasedLottoView.resetView();
    this.winnerNumberView.resetView();
    this.resultModalView.resetView();
  };

  assignMessenger(deliverMessage) {
    this.cashInputView.assignMessenger(deliverMessage);
    this.winnerNumberView.assignMessenger(deliverMessage);
  }

  renderLottos(lottos) {
    this.cashInputView.disableCashInput();
    this.purchasedLottoView.renderLottos(lottos);
    this.winnerNumberView.render();
  }

  renderResultModal(results) {
    this.resultModalView.renderResultModal(results);
  }
}
export default LottoView;
