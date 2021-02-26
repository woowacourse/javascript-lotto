import { $ } from '../utils/DOM.js';
import { RESULT_REQUESTED, APP_RESET } from '../constants/appStages.js';
import { WINNING_PRIZE } from '../constants/lottoRules.js';
import { RESULT_TABLE_DISPLAY_KEY, RATE_OF_RETURN_MESSAGE } from '../constants/display.js';
import { getTableRowHTML } from '../layouts/table.js';

export default class WinningResultDisplay {
  constructor({ stageManager }) {
    this.stageManager = stageManager;

    this.selectDOM();
    this.subscribeAppStages();
    this.attachEvents();
  }

  selectDOM() {
    this.$modal = $('.modal');
    this.$modalClose = $('.modal-close');
    this.$resultTableBody = $('.result-table-body');
    this.$rateOfReturn = $('.rate-of-return');
    this.$resetButton = $('.reset-button');
  }

  subscribeAppStages() {
    this.stageManager.subscribe(RESULT_REQUESTED, this.renderResult.bind(this));
  }

  attachEvents() {
    this.$modalClose.addEventListener('click', this.onCloseModal.bind(this));
    this.$resetButton.addEventListener('click', () => {
      this.onCloseModal();
      this.stageManager.setStates({ stage: APP_RESET });
    });
  }

  onCloseModal() {
    this.$modal.classList.remove('open');
  }

  getTableBodyHTML() {
    return RESULT_TABLE_DISPLAY_KEY.map((key) => {
      const { DESCRIPTION, PRIZE } = WINNING_PRIZE[key];
      const { lottoTickets } = this.stageManager;

      return getTableRowHTML({
        DESCRIPTION,
        PRIZE,
        numOfWinningTicket: lottoTickets.filter((ticket) => ticket.totalMatchCount === key).length,
      });
    }).join('');
  }

  renderResult() {
    this.$resultTableBody.innerHTML = this.getTableBodyHTML();
    this.$rateOfReturn.innerText = RATE_OF_RETURN_MESSAGE(this.stageManager.rateOfReturn);
    this.$modal.classList.add('open');
  }
}
