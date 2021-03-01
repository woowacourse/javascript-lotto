import { $ } from '../utils/DOM.js';
import { getLottoTicketHTML } from '../layouts/ticket.js';
import { APP_RESET, TICKET_ISSUE_COMPLETED } from '../constants/appStages.js';
import { PURCHASED_QUANTITY_MESSAGE } from '../constants/display.js';

export default class LottoTicketDisplay {
  constructor({ stageManager, lottoManager }) {
    this.stageManager = stageManager;
    this.lottoManager = lottoManager;

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
    this.stageManager.subscribe(TICKET_ISSUE_COMPLETED, this.showSection.bind(this));
    this.stageManager.subscribe(APP_RESET, this.resetSection.bind(this));
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

  showSection() {
    const { numOfLotto, lottoTickets } = this.lottoManager;

    this.$purchasedLottoSection.classList.remove('d-none');
    this.$purchasedLottoLabel.innerHTML = PURCHASED_QUANTITY_MESSAGE(numOfLotto);
    this.$lottoTicketContainer.innerHTML = lottoTickets.map(getLottoTicketHTML).join('');
  }

  resetSection() {
    this.$purchasedLottoSection.classList.add('d-none');
    this.$lottoNumbersToggleButton.checked = false;
    this.hideNumbers();
  }
}
