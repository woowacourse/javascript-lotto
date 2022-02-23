import Lottos from '../model/Lottos.js';
import { invalidPurchaseMoney } from '../util/validator.js';
import { CONFIRM_MESSAGE, RULES } from '../constants/index.js';
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
    return confirm(CONFIRM_MESSAGE.RE_PURCHASE);
  }

  purchaseLotto(purchaseMoney) {
    const lottoCount = purchaseMoney / RULES.LOTTO_PRICE;
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
