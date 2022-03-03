import EVENT from '../constants/event';
import ID from '../constants/dom';
import { insertComma } from '../utils/autoComma';
import { emit } from '../utils/event';
import { $ } from '../utils/selector';

export default class ResultModalView {
  constructor(lottoBundle) {
    this.lottoBundle = lottoBundle;
    this.$modalContainer = $(ID.MODAL_CONTAINER);
    this.$modal = $('.modal');
    this.$closeButton = $('.close');
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
    this.$closeButton.addEventListener('click', () => this.hideModal());
    this.$restartButton.addEventListener('click', () => this.handleRestart());
  }

  showModal() {
    this.$modalContainer.classList.add('show-modal');
  }

  hideModal() {
    this.$modalContainer.classList.remove('show-modal');
  }

  handleRestart() {
    emit(this.$restartButton, EVENT.CLICK_RESTART, {});
  }

  renderWinningCounts(winningCounts) {
    this.$threeCount.textContent = winningCounts['3'];
    this.$fourCount.textContent = winningCounts['4'];
    this.$fiveCount.textContent = winningCounts['5'];
    this.$fiveBonusCount.textContent = winningCounts.fiveBonus;
    this.$sixCount.textContent = winningCounts['6'];
  }

  renderYield(lottoYield, winningMoney) {
    this.$paidMoneySpan.textContent = insertComma(this.lottoBundle.paidMoney);
    this.$lottoProfitSpan.textContent = insertComma(winningMoney);
    this.$lottoYieldSpan.textContent = insertComma(lottoYield);
  }
}
