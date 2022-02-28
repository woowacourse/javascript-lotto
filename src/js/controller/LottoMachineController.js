import Lotto from '../model/Lotto.js';

import PurchaseMoneyView from '../view/purchaseMoneyView.js';
import PurchasedLottoView from '../view/PurchasedLottoView.js';
import WinningNumberView from '../view/WinningNumberView.js';

import { CONFIRM_MESSAGE, RULES } from '../constants/index.js';
import { validatePurchaseMoney, isEmpty } from '../util/validator.js';

export default class LottoMachineController {
  constructor() {
    this.#init();
    this.#setEventHandler();
  }

  #init() {
    this.lottos = null;
    this.view = {
      purchaseMoneyView: new PurchaseMoneyView(),
      purchasedLottoView: new PurchasedLottoView(),
      winningNumberView: new WinningNumberView(),
    };
  }

  #setEventHandler() {
    this.view.purchaseMoneyView.addSubmitEvent(this.#onSubmitHandler.bind(this));
  }

  #makeLottos(lottoCount) {
    const newLottos = Array.from({ length: lottoCount }).map(() => new Lotto());
    this.lottos = newLottos;
  }

  #purchaseLotto(purchaseMoney) {
    const lottoCount = purchaseMoney / RULES.LOTTO_PRICE;
    this.#makeLottos(lottoCount);

    this.view.purchasedLottoView.render(lottoCount, this.lottos);
    this.view.winningNumberView.render();
  }

  #onSubmitHandler(purchaseMoney) {
    try {
      validatePurchaseMoney(purchaseMoney);
    } catch (error) {
      this.view.purchaseMoneyView.resetInputValue();
      alert(error);
      return;
    }
    
    if (isEmpty(this.lottos)) {
      this.#purchaseLotto(purchaseMoney);
      return;
    }

    if (this.#tryRePurchase()) {
      this.#reset();
      this.#purchaseLotto(purchaseMoney);
      return;
    }

    this.view.purchaseMoneyView.resetInputValue();
  }

  #tryRePurchase() {
    return confirm(CONFIRM_MESSAGE.RE_PURCHASE);
  }

  #reset() {
    this.lottos = null;
    this.view.purchasedLottoView.reset();
    this.view.winningNumberView.reset();
  }
}
