import { createTickets } from '../lib/service/lotto.js';
import { lotto } from '../lib/state/lotto.js';
import { $ } from '../lib/utils/dom.js';
import { closeModal } from '../lib/viewController/app.js';
import { updateTicketListView } from '../lib/viewController/ticketList.js';

const lottoIssueEndHandler = event => {
  if (lotto.issuableTicketAmount) {
    const newTickets = createTickets(lotto.issuableTicketAmount);
    lotto.addTickets(...newTickets);
  }
  updateTicketListView();
  closeModal($('#lotto-issue-modal'));
};

export default lottoIssueEndHandler;
