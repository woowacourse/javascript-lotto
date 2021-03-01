import { createTickets } from '../lib/service/lotto.js';
import { lotto } from '../lib/state/lotto.js';
import { $ } from '../lib/utils/dom.js';
import { closeModal } from '../lib/viewController/app.js';
import { updateTicketListView } from '../lib/viewController/ticketList.js';
import { showWinningNumberForm } from '../lib/viewController/winningNumberForm.js';

const lottoIssueEndHandler = event => {
  if (lotto.issuableTicketAmount) {
    const newTickets = createTickets(lotto.issuableTicketAmount);
    lotto.addTickets(...newTickets);
  }
  updateTicketListView();
  showWinningNumberForm();
  closeModal($('#lotto-issue-modal'));
};

export default lottoIssueEndHandler;
