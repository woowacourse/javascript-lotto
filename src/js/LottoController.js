import Lotto from './Lotto.js';

import { LOTTO_NUMBERS, ALERT_MESSAGES } from './utils/constants.js';
import {
  isCorrectPurchaseUnit,
  isUniqueManualNumber,
  isUniqueWinningNumber,
} from './utils/lottoValidation.js';
<<<<<<< HEAD
import { $ } from './utils/dom.js';
import LottoProcessor from './utils/lottoProcessor.js';
=======
import { $ } from './utils/selector.js';
import {
  compareNumbers,
  calculateEarningRate,
  countByRank,
} from './utils/utils.js';
>>>>>>> 739d581... feat: show manual input form when choose manual purchase

import PurchaseTypeSelectView from './views/PurchaseTypeSelectView.js';
import InputPriceView from './views/InputPriceView.js';
import ManualInputView from './views/ManualInputView.js';
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
      .on('submitNumbers', e => this.inputWinningNumbersHandler(e.detail))
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

    if (this.isAutoPurchase) {
      this.purchaseAutomatically();
    } else {
      this.purchaseManually();
    }
  }

  purchaseAutomatically() {
    this.createLottos(this.purchasedPrice / LOTTO_NUMBERS.LOTTO_UNIT);
    this.purchasedLottosView.show();
    this.purchasedLottosView.renderLottos(this.lottos);
    this.winningResultView.show();
  }

  purchaseManually() {
    this.manualInputView = new ManualInputView(
      'manual-input-wrapper',
      this.purchasedPrice / LOTTO_NUMBERS.LOTTO_UNIT
    );
    this.manualInputView.on('submitNumbers', e =>
      this.inputManualNumbersHandler(e.detail)
    );
  }

  inputManualNumbersHandler(manualNumbers) {
    const ticketNumbers = manualNumbers.map(manualNumber =>
      Number(manualNumber.value)
    );
    if (!isUniqueManualNumber(ticketNumbers)) {
      alert(ALERT_MESSAGES.DUPLICATE_NUMS);
      return;
    }
  }

  inputWinningNumbersHandler(winningNumbers) {
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
