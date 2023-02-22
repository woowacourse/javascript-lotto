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

    this.moneyInputView.addSubmitHandler(this.moneyInputHandler.bind(this));
    this.winningLottoInputView.addSubmitHandler(this.winningLottoInputHandler.bind(this));
    this.lottos = [];
  }

  moneyInputHandler(money) {
    try {
      this.buyer = new Buyer(money);
      this.buyer.buyLottos();
      this.lottos = this.buyer.getLottos();
      const purchasedLottoView = new PurchasedLottoView(this.lottos, money);
      purchasedLottoView.render();
      this.winningLottoInputView.render();
    } catch (error) {
      alert(error.message);
    }
  }

  winningLottoInputHandler(winningNumbersInput, bonusNumberInput) {
    try {
      const winningNumbers = new Lotto(winningNumbersInput);
      const winningLotto = new WinningLotto(winningNumbers, bonusNumberInput);
      const lottoResult = new LottoResult(winningLotto);
      const receivedRewards = this.buyer.receiveRewards(lottoResult);
      const profitRate = this.buyer.getProfitRate(lottoResult);

      this.lottoResultModal = new LottoResultModal(receivedRewards, profitRate);
      this.lottoResultModal.render();
    } catch (error) {
      alert(error.message);
    }
  }
}

export default LottoController;
