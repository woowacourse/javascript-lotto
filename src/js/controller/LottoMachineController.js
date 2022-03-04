import Lotto from '../model/Lotto.js';

import PurchaseMoneyView from '../view/purchaseMoneyView.js';
import PurchasedLottoView from '../view/PurchasedLottoView.js';
import WinningNumberView from '../view/WinningNumberView.js';
import PopupView from '../view/PopupView.js';

import { CONFIRM_MESSAGE, RULES, REWARD } from '../constants/index.js';
import {
  validatePurchaseMoney,
  isEmpty,
  validateWinningNumbers,
} from '../util/validator.js';
import { calculateTotalReward, getRanks } from '../util/common.js';

export default class LottoMachineController {
  constructor() {
    this.#init();
    this.view.purchaseMoneyView.addSubmitEvent(
      this.#onSubmitPurchaseMoneyHandler.bind(this),
    );
  }

  #init() {
    this.lottos = null;
    this.view = {
      purchaseMoneyView: new PurchaseMoneyView(),
      purchasedLottoView: new PurchasedLottoView(),
      winningNumberView: new WinningNumberView(),
      popupView: new PopupView(),
    };
  }

  #makeLottos(lottoCount) {
    this.lottos = Array.from({ length: lottoCount }).map(() => new Lotto());
  }

  #purchaseLotto(purchaseMoney) {
    const lottoCount = purchaseMoney / RULES.LOTTO_PRICE;
    this.#makeLottos(lottoCount);

    this.view.purchasedLottoView.render(lottoCount, this.lottos);
    this.view.winningNumberView.render();

    this.view.winningNumberView.addSubmitEvent(
      this.#onSubmitWinningNumberHandler.bind(this),
    );
    this.view.winningNumberView.addNextInputFocusingEvent();
  }

  #onSubmitPurchaseMoneyHandler(purchaseMoney) {
    try {
      validatePurchaseMoney(purchaseMoney);
    } catch (error) {
      this.view.purchaseMoneyView.resetInputValue();
      alert(error.message);
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

  #onSubmitWinningNumberHandler(numbers) {
    try {
      validateWinningNumbers(numbers);
    } catch (error) {
      alert(error.message);
      return;
    }

    const results = getRanks(this.lottos, numbers);
    const totalReward = calculateTotalReward(results);
    // 수익률 = (총 상금 / 구매 금액)을 퍼센트 환산
    // 즉, 원금 상환 === 수익률 100%
    const rewardRate = totalReward / this.lottos.length / 10;

    this.view.popupView.render(results, rewardRate);
    this.view.popupView.addRestartEvent(this.#reset.bind(this));
  }
}
