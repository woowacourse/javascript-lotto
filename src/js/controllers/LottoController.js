import { setRanks } from './lottoRankController.js';

import InputPriceView from '../views/InputPriceView.js';
import PurchaseLottosView from '../views/PurchaseLottoView.js';
import ManualPurchaseView from '../views/ManualPurchaseView.js';
import PurchasedResultView from '../views/PurchasedResultView.js';
import InputWinningNumberView from '../views/InputWinningNumberView.js';
import ResultModalView from '../views/ResultModalView.js';

import LottoTicket from '../model/LottoTicket.js';

import {
  calculateCount,
  calculateEarningRate,
  countByRank,
} from '../utils/utils.js';
import { ALERT_MESSAGES, LOTTO_NUMBERS } from '../utils/constants.js';
import { $ } from '../utils/dom.js';

import { isCorrectPurchaseUnit, isUniqueNumbers } from '../lottoValidation.js';
export default class LottoController {
  constructor() {
    this.inputPriceView = new InputPriceView($('#input-price-form'));
    this.purchaseLottoView = new PurchaseLottosView($('#purchase-lottos'));
    this.manualPurchaseView = new ManualPurchaseView($('#mixed-purchase'));
    this.purchasedResultView = new PurchasedResultView(
      $('#purchased-lotto-result')
    );
    this.inputWinningNumberView = new InputWinningNumberView(
      $('#input-winning-lotto-nums')
    );
    this.resultModalView = new ResultModalView($('.modal'));

    this.lottoTicket = new LottoTicket();
  }

  init() {
    this.reset();
    this.bindEvents();
  }

  reset() {
    this.purchasedPrice = 0;
    this.amountOfLotto = 0;

    this.lottoTicket.init();

    this.inputPriceView.show().resetInputPrice();
    this.purchaseLottoView.hide().resetButton();
    this.manualPurchaseView.hide().resetManualPurchaseForm();
    this.purchasedResultView.hide();
    this.inputWinningNumberView.hide().resetWinningNumbers();
  }

  renderManualPurchaseInputForm() {
    this.renderPurchasedLottos();

    this.manualPurchaseView
      .show()
      .resetManualPurchaseForm()
      .showRemainingCount(this.amountOfLotto);
  }

  renderPurchasedLottos() {
    this.purchasedResultView.show().renderLottos(this.lottoTicket.getLottos());
  }

  renderPurchaseResult() {
    this.purchaseLottoView.hide();

    this.renderPurchasedLottos();
    this.inputWinningNumberView.show();
  }

  renderResultModal() {
    this.resultModalView.showModal(
      this.lottoTicket.rankCounts,
      this.lottoTicket.earningRate
    );
  }

  updateResult(winningNumbers) {
    const ranks = setRanks(this.lottoTicket.getLottos(), winningNumbers);

    this.lottoTicket.rankCounts = countByRank(ranks, LOTTO_NUMBERS.RANK_SIZE);
    this.lottoTicket.earningRate = calculateEarningRate(
      this.purchasedPrice,
      this.lottoTicket.rankCounts
    );
  }

  bindEvents() {
    this.inputPriceView.on('submitPrice', e =>
      this.inputPriceHandler(e.detail)
    );

    this.purchaseLottoView
      .on('mixedPurchase', () => this.renderManualPurchaseInputForm())
      .on('allAutoPurchase', () => this.autoPurchaseLottoHandler());

    this.manualPurchaseView
      .on('submitNumbers', e => this.purchaseOneLottoHandler(e.detail))
      .on('remainingAutoPurchase', () => this.autoPurchaseLottoHandler());

    this.inputWinningNumberView.on('submitNumbers', e =>
      this.inputWinningNumbersHandler(e.detail)
    );

    this.resultModalView.on('clickResetBtn', () => this.reset());
  }

  inputPriceHandler(inputPrice) {
    if (!isCorrectPurchaseUnit(inputPrice)) {
      this.inputPriceView.resetInputPrice();
      alert(ALERT_MESSAGES.INCORRECT_UNIT);

      return;
    }

    this.purchasedPrice = inputPrice;
    this.amountOfLotto = calculateCount(this.purchasedPrice);

    this.purchaseLottoView.show();
  }

  autoPurchaseLottoHandler() {
    this.lottoTicket.addAutoPurchaseLottos(this.amountOfLotto);
    this.renderPurchaseResult();
  }

  purchaseOneLottoHandler(inputNumbers) {
    if (!isUniqueNumbers(inputNumbers, LOTTO_NUMBERS.LOTTO_COUNT)) {
      alert(ALERT_MESSAGES.DUPLICATE_NUMS);
      return;
    }

    this.lottoTicket.addManualPurchaseLotto(inputNumbers);

    --this.amountOfLotto === LOTTO_NUMBERS.REMAINING_ZERO
      ? this.renderPurchaseResult()
      : this.renderManualPurchaseInputForm();
  }

  inputWinningNumbersHandler(winningNumbers) {
    if (!isUniqueNumbers(winningNumbers, LOTTO_NUMBERS.WINNING_NUMBER_COUNT)) {
      alert(ALERT_MESSAGES.DUPLICATE_NUMS);
      return;
    }

    this.updateResult(winningNumbers);
    this.renderResultModal();
  }
}
