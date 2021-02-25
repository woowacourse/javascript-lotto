import Lotto from './Lotto.js';

import { LOTTO_NUMBERS, ALERT_MESSAGES } from './utils/constants.js';
import {
  isCorrectPurchaseUnit,
  isUniqueWinningNumber,
} from './utils/lottoValidation.js';
import { $ } from './utils/dom.js';
import LottoProcessor from './utils/lottoProcessor.js';

import PurchaseTypeSelectView from './views/PurchaseTypeSelectView.js';
import InputPriceView from './views/InputPriceView.js';
import PurchasedLottosView from './views/PurchasedLottosView.js';
import WinningResultView from './views/WinningResultView.js';

export default class LottoController {
  constructor() {
    this.purchaseTypeSelectView = new PurchaseTypeSelectView(
      $('#purchase-type')
    );
    this.inputPriceView = new InputPriceView($('#input-price-form'));
    this.purchasedLottosView = new PurchasedLottosView($('#purchased-lottos'));
<<<<<<< HEAD
    this.winningResultView = new WinningResultView($('#winning-numbers-form'));
=======
    this.winningResultView = new WinningResultView($('#input-winning-nums'));
>>>>>>> 56b3a9e... refactor: rename lotto-input-nums to lotto-winning-nums
  }

  init() {
    this.reset();
    this.bindEvents();
  }

  reset() {
    this.isAutoPurchase = true;
    this.lottos = [];
    this.purchasedPrice = 0;

    this.inputPriceView.resetInputPrice();
    this.purchasedLottosView.hide().resetToggleSwitch();
    this.winningResultView.hide().resetWinningNumbers();
  }

  bindEvents() {
    this.purchaseTypeSelectView.on('selectType', e => {
      this.isAutoPurchase = e.detail;
    });
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
    if (!isUniqueWinningNumber(winningNumbers)) {
      alert(ALERT_MESSAGES.DUPLICATE_NUMS);
      return;
    }

    const lottoProcessor = new LottoProcessor(this.lottos, winningNumbers);
    lottoProcessor.checkMatchingNums();
    lottoProcessor.calculateEarningRate(this.purchasedPrice);

    this.winningResultView.showModal(
      lottoProcessor.rankCounts,
      lottoProcessor.earningRate
    );
  }
}
