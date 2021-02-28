import { $ } from '../utils/DOM.js';
import { APP_RESET, PURCHASE_OPTION_COMPLETED } from '../constants/appStages.js';
import { PURCHASED_QUANTITY_MESSAGE } from '../constants/display.js';
import { getLottoTicketHTML } from '../layouts/ticket.js';

export default class LottoTicketDisplay {
  constructor({ stageManager }) {
    this.stageManager = stageManager;

    this.selectDOMs();
    this.subscribeAppStages();
    this.attachEvents();
  }

  selectDOMs() {
    this.$purchasedLottoSection = $('.purchased-lotto-section');
    this.$lottoTicketContainer = $('.lotto-ticket-container');
    this.$purchasedLottoLabel = $('.purchased-lotto-label');
    this.$lottoNumbersToggleButton = $('.lotto-numbers-toggle-button');
  }

  subscribeAppStages() {
    this.stageManager.subscribe(PURCHASE_OPTION_COMPLETED, this.renderTicketDisplay.bind(this));
    this.stageManager.subscribe(APP_RESET, this.resetTicketDisplay.bind(this));
  }

  attachEvents() {
    $('.switch').addEventListener('click', this.onToggleShowingNumbers.bind(this));
  }

  onToggleShowingNumbers({ target }) {
    if (target.type !== 'checkbox') {
      return;
    }
    target.checked ? this.showNumbers() : this.hideNumbers();
  }

  showNumbers() {
    this.$lottoTicketContainer.classList.add('flex-col-with-num');
  }

  hideNumbers() {
    this.$lottoTicketContainer.classList.remove('flex-col-with-num');
  }

  renderTicketDisplay() {
    const { numOfLotto } = this.stageManager;
    const { lottoTickets } = this.stageManager;

    this.$purchasedLottoSection.classList.remove('d-none');
    this.$purchasedLottoLabel.innerHTML = PURCHASED_QUANTITY_MESSAGE(numOfLotto);
    this.$lottoTicketContainer.innerHTML = lottoTickets.map(getLottoTicketHTML).join('');
  }

  resetTicketDisplay() {
    this.$purchasedLottoSection.classList.add('d-none');
    this.$lottoNumbersToggleButton.checked = false;
    this.hideNumbers();
  }
}
