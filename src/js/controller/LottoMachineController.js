import Lottos from '../model/Lottos.js';

import PurchaseMoneyView from '../view/PurchaseMoneyView.js';
import PurchasedLottoView from '../view/PurchasedLottoView.js';
import WinningNumberView from '../view/WinningNumberView.js';

import { CONFIRM_MESSAGE, RULES } from '../constants/index.js';
import { validatePurchaseMoney, isEmptyArray } from '../util/validator.js';

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
      winningNumberView: new WinningNumberView(),
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
    this.view.winningNumberView.render();
  }

  onSubmitHandler(purchaseMoney) {
    try {
      validatePurchaseMoney(purchaseMoney);
    } catch (error) {
      this.view.purchaseMoneyView.resetInputValue();
      alert(error);
      return;
    }
    const lottos = this.model.getLottos();

    if (isEmptyArray(lottos)) {
      this.purchaseLotto(purchaseMoney);
      return;
    }

    if (this.tryRePurchase()) {
      this.reset();
      this.purchaseLotto(purchaseMoney);
      return;
    }

    this.view.purchaseMoneyView.resetInputValue();
  }

  tryRePurchase() {
    return confirm(CONFIRM_MESSAGE.RE_PURCHASE);
  }

  reset() {
    this.model.reset();
    this.view.purchasedLottoView.reset();
    this.view.winningNumberView.reset();
  }
}
