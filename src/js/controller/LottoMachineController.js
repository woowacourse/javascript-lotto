import Lotto from '../model/Lotto.js';

import PurchaseMoneyView from '../view/purchaseMoneyView.js';
import PurchasedLottoView from '../view/PurchasedLottoView.js';
import WinningNumberView from '../view/WinningNumberView.js';

import { CONFIRM_MESSAGE, RULES, REWARD } from '../constants/index.js';
import { validatePurchaseMoney, isEmpty, validateWinningNumbers } from '../util/validator.js';

export default class LottoMachineController {
  constructor() {
    this.#init();
    this.view.purchaseMoneyView.addSubmitEvent(this.#onSubmitPurchaseMoneyHandler.bind(this));
  }

  #init() {
    this.lottos = null;
    this.view = {
      purchaseMoneyView: new PurchaseMoneyView(),
      purchasedLottoView: new PurchasedLottoView(),
      winningNumberView: new WinningNumberView(),
    };
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

    this.view.winningNumberView.addSubmitEvent(this.#onSubmitWinningNumberHandler.bind(this));
  }

  #onSubmitPurchaseMoneyHandler(purchaseMoney) {
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

  #countCorrectNumber(lottos, numbers) {
    const results = [];

    lottos.forEach(lotto => {
      const lottoList = lotto.getList();
      let correctWinNumCount = 0;
      for (let i = 0; i < RULES.LOTTO_NUMS; i++) {
        if (lottoList.includes(numbers[i])) {
          correctWinNumCount++;
        }
      }

      let correctBonusNumCount = 0;
      for (let i = RULES.LOTTO_NUMS; i < RULES.LOTTO_NUMS + RULES.BONUS_NUMS; i++) {
        if (lottoList.includes(numbers[i])) {
          correctBonusNumCount++;
        }
      }

      results.push({ win: correctWinNumCount, bonus: correctBonusNumCount });
    });

    return results;
  }

  #calculateTotalReward(results) {
    let totalReward = 0;

    results.forEach(result => {
      const { win, bonus } = result;
      if (win === RULES.LOTTO_NUMS) {
        totalReward += REWARD.FIRST;
      }
      if (win === RULES.LOTTO_NUMS - 1 && bonus === RULES.BONUS_NUMS) {
        totalReward += REWARD.SECOND;
      }
      if (win === RULES.LOTTO_NUMS - 1 && bonus === 0) {
        totalReward += REWARD.THIRD;
      }
      if (win === RULES.LOTTO_NUMS - 2) {
        totalReward += REWARD.FOURTH;
      }
      if (win === RULES.LOTTO_NUMS - 3) {
        totalReward += REWARD.FIFTH;
      }
    });

    return totalReward;
  }

  #onSubmitWinningNumberHandler(numbers) {
    try {
      validateWinningNumbers(numbers);
    } catch (error) {
      alert(error);
      return;
    }

    const results = this.#countCorrectNumber(this.lottos, numbers);
    const totalReward = this.#calculateTotalReward(results);
  }
}
