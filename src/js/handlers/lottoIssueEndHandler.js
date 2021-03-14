import { createTickets } from '../lib/service/lotto.js';
import { lotto } from '../lib/state/lotto.js';
import { $ } from '../lib/utils/dom.js';
import { closeModal, showDOMElement } from '../lib/viewController/app.js';
import { updateTicketListView } from '../lib/viewController/ticketList.js';

const lottoIssueEndHandler = () => {
  if (lotto.issuableTicketAmount) {
    const newTickets = createTickets(lotto.issuableTicketAmount);
    lotto.addTickets(...newTickets);
  }
  updateTicketListView();
  showDOMElement($('#lotto-number-form'));
  showDOMElement($('#ticket-list-wrapper'));
  closeModal($('#lotto-issue-modal'));
};

export default lottoIssueEndHandler;
