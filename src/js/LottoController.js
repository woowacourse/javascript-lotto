import InputPriceView from './views/InputPriceView.js';
import PurchasedLottosView from './views/PurchasedLottosView.js';
import InputWinningNumberView from './views/InputWinningNumberView.js';
import ResultModalView from './views/ResultModalView.js';

import LottoTicket from './model/LottoTicket.js';

import { LOTTO_NUMBERS, ALERT_MESSAGES } from './utils/constants.js';
import { $ } from './utils/dom.js';
import {
  isCorrectPurchaseUnit,
  isUniqueWinningNumber,
} from './utils/lottoValidation.js';
import {
  checkMatchingCount,
  checkBonusNums,
  setRanks,
  countByRank,
  calculateEarningRate,
} from './utils/utils.js';

export default class LottoController {
  constructor() {
    this.inputPriceView = new InputPriceView($('#input-price-form'));
    this.purchasedLottosView = new PurchasedLottosView($('#purchased-lottos'));
    this.inputWinningNumberView = new InputWinningNumberView(
      $('#input-lotto-nums')
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

    this.inputPriceView.show().resetInputPrice();
    this.purchasedLottosView.hide().resetToggleSwitch();
    this.inputWinningNumberView.hide().resetWinningNumbers();
  }

  renderPurchaseResult() {
    this.purchasedLottosView.show();
    this.purchasedLottosView.renderLottos(this.lottoTicket.lottos);
    this.inputWinningNumberView.show();
  }

  renderResultModal() {
    this.resultModalView.showModal(
      this.lottoTicket.rankCounts,
      this.lottoTicket.earningRate
    );
  }

  bindEvents() {
    this.inputPriceView.on('submitPrice', e =>
      this.inputPriceHandler(e.detail)
    );

    this.inputWinningNumberView.on('submitNumbers', e =>
      this.inputWinningNumbersHandler(e.detail)
    );

    this.resultModalView.on('clickResetBtn', () => this.reset());
  }

  inputPriceHandler(inputPrice) {
    this.purchasedPrice = inputPrice;
    if (!isCorrectPurchaseUnit(this.purchasedPrice)) {
      this.inputPriceView.resetInputPrice();
      alert(ALERT_MESSAGES.INCORRECT_UNIT);
      return;
    }

    this.lottoTicket.lottos = inputPrice;
    this.renderPurchaseResult();
  }

  inputWinningNumbersHandler(winningNumbers) {
    if (!isUniqueWinningNumber(winningNumbers)) {
      alert(ALERT_MESSAGES.DUPLICATE_NUMS);
      return;
    }

    const ranks = setRanks(
      this.countMatchingNums(winningNumbers),
      this.filterIsMatchingBonus(winningNumbers)
    );
    this.lottoTicket.rankCounts = countByRank(ranks);
    this.lottoTicket.earningRate = calculateEarningRate(
      this.purchasedPrice,
      this.lottoTicket.rankCounts
    );

    this.renderResultModal();
  }

  countMatchingNums(winningNumbers) {
    return this.lottoTicket.lottos.map(lotto =>
      checkMatchingCount(
        lotto,
        winningNumbers.slice(0, LOTTO_NUMBERS.LOTTO_COUNT)
      )
    );
  }

  filterIsMatchingBonus(winningNumbers) {
    return this.lottoTicket.lottos.map(lotto =>
      checkBonusNums(
        lotto,
        winningNumbers[LOTTO_NUMBERS.WINNING_NUMBER_COUNT - 1]
      )
    );
  }
}
