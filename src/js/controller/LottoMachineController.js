import Lottos from '../model/Lottos.js';

import PurchaseMoneyView from '../view/PurchaseMoneyView.js';
import PurchasedLottoView from '../view/PurchasedLottoView.js';
import WinningNumberView from '../view/WinningNumberView.js';

import { CONFIRM_MESSAGE, RULES } from '../constants/index.js';
import { isEmptyArray } from '../util/validator.js';

export default class LottoMachineController {
  constructor() {
    console.log('LottoMachineController');
    this.model = new Lottos();
    this.view = {
      purchaseMoneyView: new PurchaseMoneyView(),
      purchasedLottoView: new PurchasedLottoView(),
      winningNumberView: new WinningNumberView(),
    };
    this.setEventHandler();
  }

  setEventHandler() {
    this.view.purchaseMoneyView.addSubmitEvent(this.onSubmitHandler.bind(this));
  }

  purchaseLotto(purchaseMoney) {
    const lottoCount = purchaseMoney / RULES.LOTTO_PRICE;
    const purchasedLottos = this.model.makeNewLottos(lottoCount);

    return { lottoCount, purchasedLottos };
  }

  onSubmitHandler(purchaseMoney) {
    const lottos = this.model.getLottos();
    const { lottoCount, purchasedLottos } = this.purchaseLotto(purchaseMoney);

    if (isEmptyArray(lottos)) {
      this.view.purchasedLottoView.rendering(lottoCount, purchasedLottos);
      this.view.winningNumberView.rendering(purchasedLottos, purchaseMoney);
      return;
    }
    if (this.tryRePurchase()) {
      this.view.purchasedLottoView.reflow(lottoCount, purchasedLottos);
      this.view.winningNumberView.reflow(purchasedLottos, purchaseMoney);
      return;
    }

    this.view.purchaseMoneyView.resetInputValue();
  }

  onSubmitLottoResult() {
    console.log('submit', this.model);
  }

  tryRePurchase() {
    return window.confirm(CONFIRM_MESSAGE.RE_PURCHASE);
  }

  reset() {
    this.model.reset();

    // this.view.purchasedLottoView.reset();
    // this.view.winningNumberView.reset();
  }
}
