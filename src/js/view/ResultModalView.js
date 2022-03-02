import EVENT from '../constants/event';
import ID from '../constants/selector';
import { emit } from '../utils/event';
import { $ } from '../utils/selector';

export default class ResultModalView {
  constructor() {
    this.$modalContainer = $(ID.MODAL_CONTAINER);
    this.$modal = $('.modal');
    this.$closeButton = $('.close');
    this.$restartButton = $(ID.RESTART_BUTTON);

    this.#bindEvents();
  }

  #bindEvents() {
    // window.addEventListener('click', (e) =>
    //   e.target !== this.$modal ? this.hideModal() : false,
    // );
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
    $(ID.THREE_COUNT).textContent = winningCounts.three;
    $(ID.FOUR_COUNT).textContent = winningCounts.four;
    $(ID.FIVE_COUNT).textContent = winningCounts.five;
    $(ID.FIVE_BONUS_COUNT).textContent = winningCounts.fiveBonus;
    $(ID.SIX_COUNT).textContent = winningCounts.six;
  }

  renderYield(lottoYield) {
    $(ID.LOTTO_YIELD_SPAN).textContent = lottoYield;
  }
}
