import ManualLottoPurchaseInput from './ManualLottoPurchaseInput.js';
import PurchaseAmountInput from './PurchaseAmountInput.js';

export default class LottoPurchase {
  constructor({ updateLottoTickets }) {
    this.numOfLotto = 0;

    this.purchaseAmountInput = new PurchaseAmountInput({
      updateNumOfLotto: this.updateNumOfLotto.bind(this),
    });
    this.manualLottoPurchaseInput = new ManualLottoPurchaseInput({
      isVisible: false,
      numOfLotto: this.numOfLotto,
      updateLottoTickets,
    });
  }

  reset() {
    this.purchaseAmountInput.reset();
  }

  updateNumOfLotto(numOfLotto) {
    this.setState({ numOfLotto });
  }

  setState({ numOfLotto }) {
    this.numOfLotto = numOfLotto ?? this.numOfLotto;
    this.manualLottoPurchaseInput.setState({
      isVisible: this.numOfLotto > 0,
      numOfLotto: this.numOfLotto,
    });
  }
}
