import EVENT from '../constants/event';
import ID from '../constants/dom';
import { insertComma } from '../utils/autoComma';
import { emit, on } from '../utils/event';
import { $, $$ } from '../utils/selector';

export default class ResultModalView {
  constructor(lottoVendor) {
    this.lottoVendor = lottoVendor;
    this.$modalContainer = $(ID.MODAL_CONTAINER);
    this.$modal = $('.modal');
    this.$closeSmallButton = $('.x-shape');
    this.$closeMainButton = $('#close-modal-button');
    this.$restartButton = $(ID.RESTART_BUTTON);
    this.$threeCount = $(ID.THREE_COUNT);
    this.$fourCount = $(ID.FOUR_COUNT);
    this.$fiveCount = $(ID.FIVE_COUNT);
    this.$fiveBonusCount = $(ID.FIVE_BONUS_COUNT);
    this.$sixCount = $(ID.SIX_COUNT);
    this.$lottoProfitSpan = $(ID.LOTTO_PROFIT_SPAN);
    this.$lottoYieldSpan = $(ID.LOTTO_YIELD_SPAN);
    this.$paidMoneySpan = $(ID.PURCHASE_MONEY_SPAN);
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$closeMainButton, 'click', () => this.#handleClose());
    on(this.$closeSmallButton, 'click', () => this.toggleModalDisplay());
    on(this.$restartButton, 'click', () => this.handleRestart());
  }

  #handleClose() {
    emit(this.$closeMainButton, '@close-modal', {});
  }

  toggleModalDisplay() {
    this.$modalContainer.classList.toggle('show-modal');
  }

  handleRestart() {
    emit(this.$restartButton, EVENT.CLICK_RESTART, {});
  }

  renderWinningCounts(winningCounts) {
    this.$threeCount.textContent = winningCounts.fifthPlace;
    this.$fourCount.textContent = winningCounts.fourthPlace;
    this.$fiveCount.textContent = winningCounts.thirdPlace;
    this.$fiveBonusCount.textContent = winningCounts.secondPlace;
    this.$sixCount.textContent = winningCounts.firstPlace;
  }

  renderYield(paidMoney, winningMoney, lottoYield) {
    this.$paidMoneySpan.textContent = insertComma(paidMoney);
    this.$lottoProfitSpan.textContent = insertComma(winningMoney);
    this.$lottoYieldSpan.textContent = insertComma(lottoYield);
  }
}
