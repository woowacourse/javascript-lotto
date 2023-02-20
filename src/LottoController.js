import Buyer from './domain/Buyer';
import MoneyInputView from './view/MoneyInputView';

class LottoController {
  constructor() {
    this.moneyInputView = new MoneyInputView();
    this.moneyInputView.addSubmitHandler(this.moneyInputHandler.bind(this));
    this.lottos = [];
  }

  moneyInputHandler(money) {
    try {
      this.buyer = new Buyer(money);
      this.buyer.buyLottos();
      this.lottos = this.buyer.getLottos();
    } catch (error) {
      alert(error.message);
    }
  }
}

export default LottoController;
