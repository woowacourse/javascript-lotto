import Lottos from '../model/Lottos.js';
import { invalidPurchaseMoney } from '../util/validator.js';
import PurchaseMoneyView from '../view/purchaseMoneyView.js';
import PurchasedLottoView from '../view/PurchasedLottoView.js';
import LottoNumberView from '../view/LottoNumberView.js';

export default class LottoMachineController {
  constructor() {
    this.init();
    this.setEventHandler();
  }

  init() {
    this.view = {
      purchaseMoneyView: new PurchaseMoneyView(),
      purchasedLottoView: new PurchasedLottoView(),
      lottoNumberView: new LottoNumberView(),
    };
    this.model = new Lottos();
  }

  setEventHandler() {
    this.view.purchaseMoneyView.addSubmitEvent(this.onSubmitHandler.bind(this));
  }

  rePurchase() {
    return confirm(
      '다시 구입하시면 이미 구입했던 로또는 사라집니다. 다시 구입하시겠습니까?',
    );
  }

  purchaseLotto(purchaseMoney) {
    const lottoCount = purchaseMoney / 1000;
    this.model.makeLottos(lottoCount);

    this.view.purchasedLottoView.render({
      lottoCount,
      lottos: this.model.getLottos(),
    });

    this.view.lottoNumberView.render();
  }

  onSubmitHandler(purchaseMoney) {
    try {
      invalidPurchaseMoney(purchaseMoney);
    } catch (e) {
      this.view.purchaseMoneyView.resetInputValue();
      alert(e);
      return;
    }

    if (this.model.getLottos()) {
      if (!this.rePurchase()) {
        this.view.purchaseMoneyView.resetInputValue();
        return;
      }
      this.reset();
    }

    this.purchaseLotto(purchaseMoney);
  }

  reset() {
    this.model.init();
    this.view.purchasedLottoView.reset();
    this.view.lottoNumberView.reset();
  }
}
