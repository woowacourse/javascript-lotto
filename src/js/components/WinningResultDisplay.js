import { $ } from '../utils/DOM.js';
import { RESULT_REQUESTED, APP_RESET } from '../constants/appStages.js';
import { WINNING_PRIZE } from '../constants/lottoRules.js';
import { RESULT_TABLE_DISPLAY_KEY, RATE_OF_RETURN_MESSAGE } from '../constants/display.js';

export default class WinningResultDisplay {
  constructor({ lottoManager }) {
    this.lottoManager = lottoManager;

    this.selectDOM();
    this.subscribeAppStages();
    this.attachEvents();
  }

  selectDOM() {
    this.$modal = $('.modal');
    this.$modalClose = $('.modal-close');
    this.$resultTableBody = $('.result-table-body');
    this.$rateOfReturn = $('.rate-of-return');
    this.$restartButton = $('.restart-button');
  }

  subscribeAppStages() {
    this.lottoManager?.subscribe(RESULT_REQUESTED, this.renderResult.bind(this));
  }

  attachEvents() {
    this.$modalClose?.addEventListener('click', this.onCloseModal.bind(this));
    this.$restartButton?.addEventListener('click', () => {
      this.onCloseModal();
      this.lottoManager.setStates({ stage: APP_RESET });
    });
  }

  onCloseModal() {
    this.$modal.classList.remove('open');
  }

  getTableBodyHTML() {
    return RESULT_TABLE_DISPLAY_KEY.map((key) => {
      const { DESCRIPTION, PRIZE } = WINNING_PRIZE[key];
      const lottoTickets = this.lottoManager.lottoTickets;

      return this.getTableRowHTML({
        DESCRIPTION,
        PRIZE,
        numOfWinningTicket: lottoTickets.filter((ticket) => ticket.totalMatchCount === key).length,
      });
    }).join('');
  }

  getTableRowHTML({ DESCRIPTION, PRIZE, numOfWinningTicket }) {
    return `
      <tr class="text-center">
        <td class="p-3">${DESCRIPTION}</td>
        <td class="p-3">${PRIZE.toLocaleString()}</td>
        <td class="p-3">${numOfWinningTicket}</td>
      </tr>`;
  }

  renderResult() {
    this.$resultTableBody.innerHTML = this.getTableBodyHTML();
    this.$rateOfReturn.innerText = RATE_OF_RETURN_MESSAGE(this.lottoManager.rateOfReturn);
    this.$modal.classList.add('open');
  }
}
