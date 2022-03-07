import { $ } from '../utils/selector.js';
import { on, emit } from '../utils/event.js';
import CUSTOM_EVENT from '../constants/event.js';
import { ID } from '../constants/selector.js';

export default class StatisticsView {
  constructor() {
    this.$statisticsModal = $(ID.STATISTICS_MODAL);
    this.$statisticsModalContainer = $(ID.STATISTICS_MODAL_CONTAINER);
    this.$closeButton = $(ID.CLOSE_BUTTON);
    this.$restartButton = $(ID.RESTART_BUTTON);
    this.$prizeCount = {
      first: $(ID.FIRST_PRIZE_COUNT),
      second: $(ID.SECOND_PRIZE_COUNT),
      third: $(ID.THIRD_PRIZE_COUNT),
      fourth: $(ID.FOURTH_PRIZE_COUNT),
      fifth: $(ID.FIFTH_PRIZE_COUNT),
    };
    this.$rateOfReturn = $(ID.RATE_OF_RETURN);
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
    Object.keys(this.$prizeCount).forEach((rankKey) => {
      this.$prizeCount[rankKey].textContent = prizeCount[rankKey];
    });
  }

  renderRateOfReturn(rateOfReturn) {
    this.$rateOfReturn.textContent = rateOfReturn;
  }
}
