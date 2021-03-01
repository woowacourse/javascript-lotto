import { $ } from '../utils/DOM.js';
import { getTableRowHTML } from '../layouts/table.js';
import { APP_RESET, RESULT_REQUESTED } from '../constants/appStages.js';
import { WINNING_PRIZE } from '../constants/lottoRules.js';
import { RESULT_TABLE_DISPLAY_KEY, RATE_OF_RETURN_MESSAGE } from '../constants/display.js';

export default class WinningResultDisplay {
  constructor({ stageManager, lottoManager }) {
    this.stageManager = stageManager;
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
    this.$resetButton = $('.reset-button');
  }

  subscribeAppStages() {
    this.stageManager.subscribe(RESULT_REQUESTED, this.showSection.bind(this));
  }

  attachEvents() {
    this.$modalClose.addEventListener('click', this.hideSection.bind(this));
    this.$resetButton.addEventListener('click', () => {
      this.hideSection();
      this.stageManager.setStates({ stage: APP_RESET });
    });
  }

  getTableBodyHTML() {
    return RESULT_TABLE_DISPLAY_KEY.map((key) => {
      const { DESCRIPTION, PRIZE } = WINNING_PRIZE[key];
      const { lottoTickets } = this.lottoManager;

      return getTableRowHTML({
        DESCRIPTION,
        PRIZE,
        numOfWinningTicket: lottoTickets.filter((ticket) => ticket.numOfMatch === key).length,
      });
    }).join('');
  }

  showSection() {
    this.$resultTableBody.innerHTML = this.getTableBodyHTML();
    this.$rateOfReturn.innerText = RATE_OF_RETURN_MESSAGE(this.lottoManager.rateOfReturn);
    this.$modal.classList.add('open');
  }

  hideSection() {
    this.$modal.classList.remove('open');
  }
}
