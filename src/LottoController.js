import Buyer from './domain/Buyer';
import MoneyInputView from './view/MoneyInputView';
import PurchasedLottoView from './view/PurchasedLottoView';

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
      const purchasedLottoView = new PurchasedLottoView(this.lottos, money);
      purchasedLottoView.render();
    } catch (error) {
      alert(error.message);
    }
  }
}

export default LottoController;
