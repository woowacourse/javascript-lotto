import Lotto from './Lotto.js';

import { LOTTO_NUMBERS, ALERT_MESSAGES } from './utils/constants.js';
import {
  isCorrectPurchaseUnit,
  isUniqueManualNumber,
  isUniqueWinningNumber,
} from './utils/lottoValidation.js';
import LottoProcessor from './utils/lottoProcessor.js';
import { $ } from './utils/dom.js';

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
    this.manualInputView = new ManualInputView($('#manual-input-wrapper'));
    this.purchasedLottosView = new PurchasedLottosView($('#purchased-lottos'));
    this.winningResultView = new WinningResultView($('#winning-numbers-form'));
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
    this.manualInputView.hide().resetManualInputs();
    this.purchasedLottosView.hide().resetToggleSwitch();
    this.winningResultView.hide().resetWinningNumbers();
  }

  bindEvents() {
    this.purchaseTypeSelectView.on('selectType', e =>
      this.selectTypeHandler(e.detail)
    );
    this.inputPriceView.on('submitPrice', e =>
      this.inputPriceHandler(e.detail)
    );
    this.manualInputView.on('submitTicket', e =>
      this.inputManualTicketHandler(e.detail)
    );
    this.manualInputView.on('confirmAll', e =>
      this.confirmManualPurchaseHandler(e.detail)
    );
    this.winningResultView
      .on('submitNumbers', e => this.inputWinningNumbersHandler(e.detail))
      .on('clickResetBtn', () => this.reset());
  }

  selectTypeHandler(isAuto) {
    this.reset();
    this.isAutoPurchase = isAuto;
  }

  inputPriceHandler(inputPrice) {
    this.purchasedPrice = inputPrice;
    if (!isCorrectPurchaseUnit(this.purchasedPrice)) {
      this.inputPriceView.resetInputPrice();
      alert(ALERT_MESSAGES.INCORRECT_UNIT);
      return;
    }

    if (this.isAutoPurchase) {
      this.purchaseAutomatically(
        this.purchasedPrice / LOTTO_NUMBERS.LOTTO_UNIT
      );
    } else {
      this.purchaseManually();
    }
  }

  purchaseAutomatically(count) {
    this.createAutoLottos(count);
    this.purchasedLottosView.show().renderLottos(this.lottos);
    this.winningResultView.show();
  }

  purchaseManually() {
    this.manualInputView
      .show()
      .init(this.purchasedPrice / LOTTO_NUMBERS.LOTTO_UNIT);
  }

  inputManualTicketHandler(eventDetail) {
    const ticketNumbers = eventDetail.numberInputs.map(input =>
      Number(input.value)
    );
    if (!isUniqueManualNumber(ticketNumbers)) {
      alert(ALERT_MESSAGES.DUPLICATE_NUMS);
      return;
    }
    this.manualInputView.saveTemporaryTicket(
      ticketNumbers,
      eventDetail.ticketIdx
    );
  }

  confirmManualPurchaseHandler(manualTickets) {
    const manualCount = manualTickets.length;
    const lottoTotalCount = this.purchasedPrice / LOTTO_NUMBERS.LOTTO_UNIT;

    if (manualCount < lottoTotalCount) {
      const agreeAutoPurchase = confirm(ALERT_MESSAGES.CONVERT_TO_AUTO_ALERT);
      if (agreeAutoPurchase) {
        this.createManualLottos(manualTickets);
        this.manualInputView.hide();
        this.purchaseAutomatically(lottoTotalCount - manualCount);
      }
    } else {
      this.createManualLottos(manualTickets);
      this.manualInputView.hide();
      this.purchasedLottosView.show().renderLottos(this.lottos);
      this.winningResultView.show();
    }
  }

  createAutoLottos(lottoCount) {
    const newLottos = Array.from({ length: lottoCount }, () => {
      const lotto = new Lotto();
      lotto.initRandomNumbers();
      return lotto;
    });
    this.lottos = [...this.lottos, ...newLottos];
  }

  createManualLottos(manualTickets) {
    this.lottos = manualTickets.map(manualNumbers => new Lotto(manualNumbers));
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
