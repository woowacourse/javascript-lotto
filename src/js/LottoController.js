import Lotto from './Lotto.js';

import { LOTTO_NUMBERS, ALERT_MESSAGES } from './utils/constants.js';
import {
  isCorrectPurchaseUnit,
  isUniqueWinningNumber,
} from './utils/lottoValidation.js';
import { $ } from './utils/dom.js';
import LottoProcessor from './utils/lottoProcessor.js';

import WinningResultView from './views/WinningResultView.js';
import InputPriceView from './views/InputPriceView.js';
import PurchasedLottosView from './views/PurchasedLottosView.js';

export default class LottoController {
  constructor() {
    this.inputPriceView = new InputPriceView($('#input-price-form'));
    this.purchasedLottosView = new PurchasedLottosView($('#purchased-lottos'));
    this.winningResultView = new WinningResultView($('#winning-numbers-form'));
  }

  init() {
    this.reset();
    this.bindEvents();
  }

  reset() {
    this.lottos = [];
    this.purchasedPrice = 0;
    this.isResultCalculated = false;

    this.inputPriceView.show().resetInputPrice();
    this.purchasedLottosView.hide().resetToggleSwitch();
    this.winningResultView.hide().resetWinningNumbers();
  }

  bindEvents() {
    this.inputPriceView.on('submitPrice', e =>
      this.inputPriceHandler(e.detail)
    );

    this.winningResultView
      .on('submitNumbers', e => this.inputNumbersHandler(e.detail))
      .on('clickResetBtn', () => this.reset());
  }

  createLottos(lottoCount) {
    this.lottos = Array.from({ length: lottoCount }, () => {
      const lotto = new Lotto();
      return lotto;
    });
  }

  inputPriceHandler(inputPrice) {
    this.purchasedPrice = inputPrice;
    if (!isCorrectPurchaseUnit(this.purchasedPrice)) {
      this.inputPriceView.resetInputPrice();
      alert(ALERT_MESSAGES.INCORRECT_UNIT);
      return;
    }

    this.createLottos(this.purchasedPrice / LOTTO_NUMBERS.LOTTO_UNIT);
    this.purchasedLottosView.show();
    this.purchasedLottosView.renderLottos(this.lottos);
    this.winningResultView.show();
  }

  inputNumbersHandler(winningNumbers) {
    console.log(winningNumbers);
    if (!isUniqueWinningNumber(winningNumbers)) {
      alert(ALERT_MESSAGES.DUPLICATE_NUMS);
      return;
    }

    const lottoProcessor = new LottoProcessor(this.lottos, winningNumbers);
    if (!this.isResultCalculated) {
      lottoProcessor.checkMatchingNums();
      lottoProcessor.calculateEarningRate(this.purchasedPrice);
      this.isResultCalculated = true;
    }

    this.winningResultView.showModal(
      lottoProcessor.rankCounts,
      lottoProcessor.earningRate
    );
  }
}
