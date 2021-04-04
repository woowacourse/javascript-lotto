import LottoRankController from './LottoRankController.js';

import InputPriceView from '../views/InputPriceView.js';
import PurchaseLottosView from '../views/PurchaseLottoView.js';
import ManualPurchaseView from '../views/ManualPurchaseView.js';
import PurchasedResultView from '../views/PurchasedResultView.js';
import InputWinningNumberView from '../views/InputWinningNumberView.js';
import ResultModalView from '../views/ResultModalView.js';

import LottoTicket from '../model/LottoTicket.js';

import { ALERT_MESSAGES, LOTTO_NUMBERS } from '../utils/constants.js';
import { $ } from '../utils/dom.js';
import { isCorrectPurchaseUnit, isUniqueWinningNumber } from '../lottoValidation.js';
import { calculateCount, calculateEarningRate, countByRank } from '../utils/utils.js';

export default class LottoController {
  constructor() {
    this.lottoRankController = new LottoRankController();

    this.inputPriceView = new InputPriceView($('#input-price-form'));
    this.purchaseLottoView = new PurchaseLottosView($('#purchase-lottos'));
    this.manualPurchaseView = new ManualPurchaseView($('#mixed-purchase'));
    this.purchasedResultView = new PurchasedResultView($('#purchased-lotto-result'));
    this.inputWinningNumberView = new InputWinningNumberView($('#input-lotto-nums'));
    this.resultModalView = new ResultModalView($('.modal'));

    this.lottoTicket = new LottoTicket();
  }

  init() {
    this.reset();
    this.bindEvents();
  }

  reset() {
    this.purchasedPrice = 0;

    this.inputPriceView.show().resetInputPrice();
    this.purchaseLottoView.hide();
    this.manualPurchaseView.hide().resetManualPurchaseForm();
    this.purchasedResultView.hide().resetToggleSwitch();
    this.inputWinningNumberView.hide().resetWinningNumbers();
  }

  bindEvents() {
    this.inputPriceView.on('submitPrice', e => this.inputPriceHandler(e.detail));

    this.purchaseLottoView
      .on('mixedPurchase', () => this.manualPurchaseLottoHandler())
      .on('allAutoPurchase', () => this.autoPurchaseLottoHandler());

    this.inputWinningNumberView.on('submitNumbers', e => this.inputWinningNumbersHandler(e.detail));

    this.resultModalView.on('clickResetBtn', () => this.reset());
  }

  inputPriceHandler(inputPrice) {
    this.purchasedResultView.resetToggleSwitch();

    if (!isCorrectPurchaseUnit(this.purchasedPrice)) {
      this.inputPriceView.resetInputPrice();
      alert(ALERT_MESSAGES.INCORRECT_UNIT);

      return;
    }

    this.purchasedPrice = inputPrice;
    this.amountOfLotto = calculateCount(this.purchasedPrice);

    this.lottoTicket.lottos = inputPrice;
    this.purchaseLottoView.show();
  }

  renderPurchaseResult() {
    this.purchasedResultView.show();
    this.purchasedResultView.renderLottos(this.lottoTicket.lottos);
    this.inputWinningNumberView.show();
  }

  manualPurchaseLottoHandler() {}

  autoPurchaseLottoHandler() {}

  inputWinningNumbersHandler(winningNumbers) {
    if (!isUniqueWinningNumber(winningNumbers)) {
      alert(ALERT_MESSAGES.DUPLICATE_NUMS);
      return;
    }

    const ranks = this.lottoRankController.setRanks(this.lottoTicket.lottos, winningNumbers);

    this.lottoTicket.rankCounts = countByRank(ranks, LOTTO_NUMBERS.RANK_SIZE);
    this.lottoTicket.earningRate = calculateEarningRate(
      this.purchasedPrice,
      this.lottoTicket.rankCounts
    );

    this.renderResultModal();
  }

  renderResultModal() {
    this.resultModalView.showModal(this.lottoTicket.rankCounts, this.lottoTicket.earningRate);
  }
}
