import { lotto } from '../lib/state/lotto.js';
import { updateTicketListView } from '../lib/viewController/ticketList.js';
import { focusFirstWinningNumberInput } from '../lib/viewController/winningNumberForm.js';
import { LESS_THAN_TICKET_PRICE_MESSAGE } from '../lib/constants/alertMessage.js';
import { TICKET_PRICE } from '../lib/constants/lotto.js';
import { getTicketAmount, createTickets } from '../lib/service/lotto.js';
import { openModal } from '../lib/viewController/app.js';
import { $ } from '../lib/utils/dom.js';
import { updateIssuableTicketAmount } from '../lib/viewController/lottoIssueModal.js';

const lottoPurchaseHandler = event => {
  event.preventDefault();

  const paymentInput = Number(event.target.elements['payment-input'].value);

  if (paymentInput < TICKET_PRICE) {
    alert(LESS_THAN_TICKET_PRICE_MESSAGE);
    return;
  }

  const issuableTicketAmount = getTicketAmount(paymentInput);
  openModal($('#lotto-issue-modal'));
  updateIssuableTicketAmount(issuableTicketAmount);

  // lotto.setTickets(createTickets(ticketAmount));
  // updateTicketListView(lotto.tickets);
  // focusFirstWinningNumberInput();
};

export default lottoPurchaseHandler;
