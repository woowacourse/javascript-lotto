import CashInputView from './cashInputView';
import PurchasedLottoView from './purchasedLottoView';
import WinnerNumberView from './winnerNumberView';

class LottoView {
  constructor() {
    this.cashInputView = new CashInputView();
    this.purchasedLottoView = new PurchasedLottoView();
    this.winnerNumberView = new WinnerNumberView();

    this.deliverMessage = null;
  }

  assignMessenger(deliverMessage) {
    this.cashInputView.assignMessenger(deliverMessage);
  }

  renderLottos(lottos) {
    this.purchasedLottoView.renderLottos(lottos);
    this.winnerNumberView.render();
  }
}
export default LottoView;
