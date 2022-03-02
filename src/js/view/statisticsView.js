import { $ } from '../utils/selector.js';
import { on, emit } from '../utils/event.js';
import CUSTOM_EVENT from '../constants/event.js';

export default class StatisticsView {
  constructor() {
    this.$statisticsModal = $('#statistics-modal');
    this.$statisticsModalContainer = $('#statistics-modal-container');
    this.$closeButton = $('#close-button');
    this.$restartButton = $('#restart-button');
    this.$firstPrizeCount = $('#first-prize-count');
    this.$secondPrizeCount = $('#second-prize-count');
    this.$thirdPrizeCount = $('#third-prize-count');
    this.$fourthPrizeCount = $('#fourth-prize-count');
    this.$fifthPrizeCount = $('#fifth-prize-count');
    this.$rateOfReturn = $('#rate-of-return');
    this.bindEvents();
  }

  bindEvents() {
    on(this.$statisticsModalContainer, 'click', (e) =>
      this.handleClickForClose(e),
    );

    on(this.$restartButton, 'click', () => this.handleClickForRestart());
  }

  handleClickForClose(e) {
    if (
      e.target === this.$statisticsModalContainer ||
      e.target === this.$closeButton
    ) {
      this.hideStatisticsModal();
    }
  }

  handleClickForRestart() {
    emit(this.$restartButton, CUSTOM_EVENT.RESTART, {});
  }

  showStatisticsModal() {
    this.$statisticsModalContainer.classList.remove('hidden');
    this.$statisticsModalContainer.classList.add('show-flex');
  }

  hideStatisticsModal() {
    this.$statisticsModalContainer.classList.add('hidden');
    this.$statisticsModalContainer.classList.remove('show-flex');
  }

  renderStatistics(prizeCount, rateOfReturn) {
    this.renderPrizeCount(prizeCount);
    this.renderRateOfReturn(rateOfReturn);
  }

  renderPrizeCount(prizeCount) {
    this.$firstPrizeCount.textContent = prizeCount.first;
    this.$secondPrizeCount.textContent = prizeCount.second;
    this.$thirdPrizeCount.textContent = prizeCount.third;
    this.$fourthPrizeCount.textContent = prizeCount.fourth;
    this.$fifthPrizeCount.textContent = prizeCount.fifth;
  }

  renderRateOfReturn(rateOfReturn) {
    this.$rateOfReturn.textContent = rateOfReturn;
  }
}
