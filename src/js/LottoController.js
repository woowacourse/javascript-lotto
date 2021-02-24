import Lotto from './Lotto.js';

import { $ } from './utils/dom.js';
import { LOTTO_NUMBERS, ALERT_MESSAGES } from './utils/constants.js';
import {
  isCorrectPurchaseUnit,
  isUniqueWinningNumber,
} from './utils/lottoValidation.js';
import {
  compareNumbers,
  calculateEarningRate,
  countByRank,
} from './utils/utils.js';

import WinningResultView from './views/WinningResultView.js';
import InputPriceView from './views/InputPriceView.js';
import PurchasedLottosView from './views/PurchasedLottosView.js';

export default class LottoController {
  constructor() {
    this.inputPriceView = new InputPriceView($('#input-price-form'));
    this.purchasedLottosView = new PurchasedLottosView($('#purchased-lottos'));
    this.winningResultView = new WinningResultView($('#input-lotto-nums'));
  }

  init() {
    this.reset();
    this.bindEvents();
  }

  reset() {
    this.lottos = [];
    this.purchasedPrice = 0;

    this.inputPriceView.show().resetInputPrice();
    this.purchasedLottosView.hide().resetToggleSwitch();
    this.winningResultView.hide().resetWinningNumbers();
  }

  renderPurchaseResult() {
    this.purchasedLottosView.show();
    this.purchasedLottosView.renderLottos(this.lottos);
    this.winningResultView.show();
  }

  createLottos() {
    this.lottos = Array.from(
      { length: this.purchasedPrice / LOTTO_NUMBERS.LOTTO_UNIT },
      () => {
        const lotto = new Lotto();
        return lotto;
      }
    );
  }

  bindEvents() {
    this.inputPriceView.on('submitPrice', e =>
      this.inputPriceHandler(e.detail)
    );

    this.winningResultView
      .on('submitNumbers', e => this.inputWinningNumbersHandler(e.detail))
      .on('clickResetBtn', () => this.reset());
  }

  inputPriceHandler(inputPrice) {
    this.purchasedPrice = inputPrice;
    if (!isCorrectPurchaseUnit(this.purchasedPrice)) {
      this.inputPriceView.resetInputPrice();
      alert(ALERT_MESSAGES.INCORRECT_UNIT);
      return;
    }

    this.createLottos(this.purchasedPrice);
    this.renderPurchaseResult();
  }

  inputWinningNumbersHandler(winningNumbers) {
    if (!isUniqueWinningNumber(winningNumbers)) {
      alert(ALERT_MESSAGES.DUPLICATE_NUMS);
      return;
    }

    compareNumbers(this.lottos, winningNumbers);
    this.lottos.forEach(lotto => lotto.updateRank());
    const rankCounts = countByRank(this.lottos);

    this.winningResultView.showModal(
      rankCounts,
      calculateEarningRate(rankCounts, this.purchasedPrice)
    );
  }
}
