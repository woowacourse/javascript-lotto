import Lottos from '../model/Lottos.js';
import { invalidPurchaseMoney, isExist } from '../util/validator.js';
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
    this.model = new Lottos();
    this.view = {
      purchaseMoneyView: new PurchaseMoneyView(),
      purchasedLottoView: new PurchasedLottoView(),
      lottoNumberView: new LottoNumberView(),
    };
  }

  setEventHandler() {
    this.view.purchaseMoneyView.addSubmitEvent(this.onSubmitHandler.bind(this));
  }

  purchaseLotto(purchaseMoney) {
    const lottoCount = purchaseMoney / RULES.LOTTO_PRICE;
    this.model.makeLottos(lottoCount);

    const lottos = this.model.getLottos();

    this.view.purchasedLottoView.render(lottoCount, lottos);
    this.view.lottoNumberView.render();
  }

  tryNoRePurchase() {
    return !confirm(CONFIRM_MESSAGE.RE_PURCHASE);
  }

  //TODO
  tryRePurchase(lottos) {
    if (isExist(lottos)) {
      if (this.tryNoRePurchase()) {
        this.view.purchaseMoneyView.resetInputValue();
        return true;
      }
      this.reset();
      return false;
    }
  }

  onSubmitHandler(purchaseMoney) {
    try {
      invalidPurchaseMoney(purchaseMoney);
    } catch (error) {
      this.view.purchaseMoneyView.resetInputValue();
      alert(error);
      return;
    }
    const lottos = this.model.getLottos();

    if (this.tryRePurchase(lottos)) {
      return;
    }

    this.purchaseLotto(purchaseMoney);
  }

  reset() {
    this.model.init();
    this.view.purchasedLottoView.reset();
    this.view.lottoNumberView.reset();
  }
}
