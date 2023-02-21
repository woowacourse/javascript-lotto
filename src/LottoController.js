import Buyer from './domain/Buyer';
import Lotto from './domain/Lotto';
import WinningLotto from './domain/WinningLotto';
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
    } catch (error) {
      alert(error.message);
    }
  }
}

export default LottoController;
