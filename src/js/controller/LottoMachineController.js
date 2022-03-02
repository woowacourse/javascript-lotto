import PurchasedLottos from '../model/PurchasedLottos.js';

import PurchaseMoneyView from '../view/purchaseMoneyView.js';
import PurchasedLottoView from '../view/PurchasedLottoView.js';
import WinningNumberView from '../view/WinningNumberView.js';

import {
  CONFIRM_MESSAGE,
  LOTTO_RANKING_REWARD,
  RANKING_ACCORDING_TO_MATCH_COUNT,
  RULES,
} from '../constants/index.js';
import { getProfitRate, isEmpty } from '../utils/common.js';
import LottoResultModalView from '../view/LottoResultModalView.js';

export default class LottoMachineController {
  constructor() {
    //멤버변수 초기화
    this.model = new PurchasedLottos();
    this.view = {
      purchaseMoneyView: new PurchaseMoneyView(),
      purchasedLottoView: new PurchasedLottoView(),
      winningNumberView: new WinningNumberView(),
      lottoResultModalView: new LottoResultModalView(),
    };

    //View handlers 멤버변수에 등록
    this.view.purchaseMoneyView.addHandler({
      name: 'purchasedMoneySubmit',
      handler: this.submitPurchaseMoneyHandler.bind(this),
    });

    this.view.lottoResultModalView.addHandler({
      name: 'lottoResultModalClick',
      handler: this.reset.bind(this),
    });

    this.view.winningNumberView.addHandler({
      name: 'winningNumberSubmit',
      handler: this.calculatePurchasedLottoResult.bind(this),
    });
  }

  submitPurchaseMoneyHandler(purchaseMoney) {
    const lottos = this.model.lottos;

    if (isEmpty(lottos)) {
      this.purchaseLotto(purchaseMoney);
      return;
    }

    if (this.tryRePurchase()) {
      this.view.purchasedLottoView.resetScreen();
      this.view.winningNumberView.resetScreen();

      this.purchaseLotto(purchaseMoney);
      return;
    }

    this.view.purchaseMoneyView.resetInputValue();
  }

  purchaseLotto(purchaseMoney) {
    const lottoCount = purchaseMoney / RULES.LOTTO_PRICE;
    const lottos = this.model.purchaseLotto(lottoCount);

    this.view.purchasedLottoView.render(lottos, lottoCount);
    this.view.winningNumberView.render();
  }

  tryRePurchase() {
    return confirm(CONFIRM_MESSAGE.RE_PURCHASE);
  }

  initializeLottoResult() {
    return Object.keys(LOTTO_RANKING_REWARD).reduce((obj, ranking) => {
      obj[ranking] = 0;
      return obj;
    }, {});
  }

  calculatePurchasedLottoResult(winningNumbers) {
    const winNumbers = winningNumbers.slice(0, 6);
    const bonusNumber = winningNumbers[winningNumbers.length - 1];
    const lottoResult = this.initializeLottoResult();

    this.model.lottos.forEach(lotto => {
      const matchCount = lotto.calculateMatchCount(winNumbers, bonusNumber);
      const ranking = RANKING_ACCORDING_TO_MATCH_COUNT[matchCount];

      if (ranking !== '꽝') {
        lottoResult[ranking]++;
      }
    });
    this.view.lottoResultModalView.renderLottoResult(lottoResult);
    this.calculateTotalProfitRate(lottoResult);
  }

  calculateTotalProfitRate(lottoResult) {
    const totalProfit = Object.keys(lottoResult).reduce(
      (total, ranking) =>
        (total += lottoResult[ranking] * LOTTO_RANKING_REWARD[ranking]),
      0,
    );
    const purchasedLottoCount = this.model.lottos.length;
    const usedMoney = purchasedLottoCount * RULES.LOTTO_PRICE;
    const totalProfitRate = getProfitRate(totalProfit, usedMoney);

    this.view.lottoResultModalView.renderTotalProfitRate(totalProfitRate);
  }

  reset() {
    this.model.resetStatus();
    this.view.purchaseMoneyView.resetInputValue();
    this.view.purchasedLottoView.resetScreen();
    this.view.winningNumberView.resetScreen();
  }
}
