import Buyer from './domain/Buyer';
import Lotto from './domain/Lotto';
import WinningLotto from './domain/WinningLotto';
import LottoResult from './domain/LottoResult';
import LottoResultModal from './view/LottoResultModal';
import MoneyInputView from './view/MoneyInputView';
import PurchasedLottoView from './view/PurchasedLottoView';
import WinningLottoInputView from './view/WinningLottoInputView';

class LottoController {
  constructor() {
    this.moneyInputView = new MoneyInputView();
    this.winningLottoInputView = new WinningLottoInputView();
    this.lottoResultModal = new LottoResultModal();
    this.purchasedLottoView = new PurchasedLottoView();

    this.moneyInputView.addSubmitHandler(this.moneyInputHandler);
    this.winningLottoInputView.addSubmitHandler(this.winningLottoInputHandler);
  }

  moneyInputHandler = (money) => {
    try {
      this.buyer = new Buyer(money);
      this.moneyInputView.toggleFormDisable();
      this.buyer.buyLottos();
      const lottos = this.buyer.getLottos();
      this.renderPurchasedLotto(lottos, money);
    } catch (error) {
      alert(error.message);
    }
  };

  renderPurchasedLotto(lottos, money) {
    this.purchasedLottoView.render(lottos, money);
    this.winningLottoInputView.render();
  }

  winningLottoInputHandler = (winningNumbersInput, bonusNumberInput) => {
    try {
      const winningNumbers = new Lotto(winningNumbersInput);
      const winningLotto = new WinningLotto(winningNumbers, bonusNumberInput);
      const lottoResult = new LottoResult(winningLotto);
      const receivedRewards = this.buyer.receiveRewards(lottoResult);
      const profitRate = this.buyer.getProfitRate(lottoResult);

      this.lottoResultModal.render(receivedRewards, profitRate);
      this.lottoResultModal.addRestartButtonHandler(this.resetHandler);
    } catch (error) {
      alert(error.message);
    }
  };

  resetHandler = () => {
    this.moneyInputView.toggleFormDisable();
    this.moneyInputView.clearInput();
    this.purchasedLottoView.reset();
    this.winningLottoInputView.reset();
  };
}

export default LottoController;
