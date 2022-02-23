import Lottos from '../model/Lottos.js';
import { invalidPurchaseMoney } from '../util/validator.js';
import PurchaseMoneyView from '../view/purchaseMoneyView.js';
import PurchasedLottoView from '../view/PurchasedLottoView.js';

export default class LottoMachineController {
  constructor() {
    this.init();
    this.setEventHandler();
  }

  init() {
    this.view = {
      purchaseMoneyView: new PurchaseMoneyView(),
      purchasedLottoView: new PurchasedLottoView(),
    };
    this.model = new Lottos();
  }

  setEventHandler() {
    this.view.purchaseMoneyView.addSubmitEvent(this.onSubmitHandler.bind(this));
  }

  onSubmitHandler(purchaseMoney) {
    try {
      invalidPurchaseMoney(purchaseMoney);
    } catch (e) {
      alert(e);
      return;
    }

    const lottoCount = purchaseMoney / 1000;
    this.model.makeLottos(lottoCount);

    //TODO
    this.view.purchasedLottoView.render({
      lottoCount,
      lottos: this.model.getLottos(),
    });
  }
}
