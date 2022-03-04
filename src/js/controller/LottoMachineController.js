import PurchasedLottos from '../model/PurchasedLottos.js';

import InputMoneyView from '../view/InputMoneyView.js';
import PurchasedLottosView from '../view/PurchasedLottosView.js';
import InputWinningNumberView from '../view/InputWinningNumberView.js';
import LottoResultModalView from '../view/LottoResultModalView.js';

import {
  CONFIRM_MESSAGE,
  LOTTO_RANKING_REWARD,
  RANKING_ACCORDING_MATCH_COUNT,
  RULES,
} from '../constants/index.js';
import { isEmpty } from '../utils/common.js';

export default class LottoMachineController {
  constructor() {
    //멤버변수 초기화
    this.model = new PurchasedLottos();
    this.view = {
      inputMoneyView: new InputMoneyView(),
      purchasedLottosView: new PurchasedLottosView(),
      inputWinningNumberView: new InputWinningNumberView(),
      lottoResultModalView: new LottoResultModalView(),
    };

    //View handlers 멤버변수에 등록
    this.view.inputMoneyView.addHandler({
      name: 'purchasedMoneySubmit',
      handler: this.handlePurchaseLotto.bind(this),
    });

    this.view.lottoResultModalView.addHandler({
      name: 'lottoResultModalClick',
      handler: this.reset.bind(this),
    });

    this.view.inputWinningNumberView.addHandler({
      name: 'winningNumberSubmit',
      handler: this.handlePurchasedLottoResult.bind(this),
    });
  }

  handlePurchaseLotto(purchaseMoney) {
    const lottos = this.model.lottos;

    if (isEmpty(lottos)) {
      this.purchaseLotto(purchaseMoney);
      return;
    }

    if (this.tryRePurchase()) {
      this.view.purchasedLottosView.resetScreen();
      this.view.inputWinningNumberView.resetScreen();
      this.purchaseLotto(purchaseMoney);
      return;
    }

    this.view.inputMoneyView.resetInputValue();
  }

  purchaseLotto(purchaseMoney) {
    const lottoCount = purchaseMoney / RULES.LOTTO_PRICE;
    const lottos = this.model.purchaseLotto(lottoCount);

    this.view.purchasedLottosView.initializeScreen();
    this.view.purchasedLottosView.renderPurchasedLottoList(lottos);
    this.view.inputWinningNumberView.renderWinningNumberForm();
  }

  tryRePurchase() {
    return confirm(CONFIRM_MESSAGE.RE_PURCHASE);
  }

  handlePurchasedLottoResult(winningNumbers) {
    const lottoResult = this.calculatePurchasedLottoResult(winningNumbers);
    this.view.lottoResultModalView.renderLottoResult(lottoResult);

    const totalProfitRate = this.calculateTotalProfitRate(lottoResult);
    this.view.lottoResultModalView.renderTotalProfitRate(totalProfitRate);
  }

  calculatePurchasedLottoResult(winningNumbers) {
    const winNumbers = winningNumbers.slice(0, 6);
    const bonusNumber = winningNumbers[winningNumbers.length - 1];
    const lottoResult = this.generateLottoResultObject();

    this.model.lottos.forEach(lotto => {
      const matchCount = lotto.calculateMatchCount(winNumbers, bonusNumber);
      const ranking = RANKING_ACCORDING_MATCH_COUNT[matchCount];

      if (ranking !== '꽝') {
        lottoResult[ranking]++;
      }
    });

    return lottoResult;
  }

  generateLottoResultObject() {
    const lottoResult = [];

    for (let ranking of Object.keys(LOTTO_RANKING_REWARD)) {
      lottoResult[ranking] = 0;
    }

    return lottoResult;
  }

  calculateTotalProfitRate(lottoResult) {
    const totalProfit = Object.keys(lottoResult).reduce(
      (total, ranking) =>
        (total += lottoResult[ranking] * LOTTO_RANKING_REWARD[ranking]),
      0,
    );
    const purchasedLottoCount = this.model.lottos.length;
    const usedMoney = purchasedLottoCount * RULES.LOTTO_PRICE;

    return (totalProfit / usedMoney) * 100;
  }

  reset() {
    this.model.resetStatus();
    this.view.inputMoneyView.resetInputValue();
    this.view.purchasedLottosView.resetScreen();
    this.view.inputWinningNumberView.resetScreen();
  }
}
