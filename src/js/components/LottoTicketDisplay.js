import { $ } from '../utils/DOM.js';
import { APP_RESET, PURCHASE_AMOUNT_COMPLETED } from '../constants/appStages.js';
import { LOTTO_NUMBER_SEPARATOR, PURCHASED_QUANTITY_MESSAGE } from '../constants/display.js';

export default class LottoTicketDisplay {
  constructor({ stageManager }) {
    this.stageManager = stageManager;

    this.selectDOM();
    this.subscribeAppStages();
    this.attachEvents();
  }

  selectDOM() {
    this.$purchasedLottoSection = $('.purchased-lotto-section');
    this.$lottoTicketContainer = $('.lotto-ticket-container');
    this.$purchasedLottoLabel = $('.purchased-lotto-label');
    this.$lottoNumbersToggleButton = $('.lotto-numbers-toggle-button');
  }

  subscribeAppStages() {
    this.stageManager?.subscribe(PURCHASE_AMOUNT_COMPLETED, this.renderTicketDisplay.bind(this));
    this.stageManager?.subscribe(APP_RESET, this.resetTicketDisplay.bind(this));
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

  getLottoTicketHTML(lottoTicket) {
    return `
    <li class="mx-1 text-4xl d-flex items-center">
      🎟️
      <span class="text-xl ml-5 d-none lotto-numbers">
        ${lottoTicket.numbers.join(LOTTO_NUMBER_SEPARATOR)}
      </span>
    </li>`;
  }

  renderTicketDisplay() {
    const numOfLotto = this.stageManager.numOfLotto;
    const lottoTickets = this.stageManager.lottoTickets;

    this.$purchasedLottoSection.classList.remove('d-none');
    this.$purchasedLottoLabel.innerHTML = PURCHASED_QUANTITY_MESSAGE(numOfLotto);
    this.$lottoTicketContainer.innerHTML = lottoTickets.map(this.getLottoTicketHTML).join('');
  }

  resetTicketDisplay() {
    this.$purchasedLottoSection.classList.add('d-none');
    this.$lottoNumbersToggleButton.checked = false;
    this.hideNumbers();
  }
}
