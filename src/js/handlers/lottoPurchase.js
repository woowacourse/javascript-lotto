import { lotto } from '../lib/state/lotto.js';
import { LESS_THAN_TICKET_PRICE_MESSAGE } from '../lib/constants/alertMessage.js';
import { TICKET_PRICE } from '../lib/constants/lotto.js';
import { getTicketAmount, createTickets } from '../lib/service/lotto.js';
import { updateTicketListView } from '../lib/viewController/ticketList.js';
import { focusFirstWinningNumberInput } from '../lib/viewController/winningNumberForm.js';

const lottoPurchaseHandler = event => {
  event.preventDefault();

  const paymentInput = Number(event.target.elements['payment-input'].value);
  const ticketAmount = getTicketAmount(paymentInput);

  if (paymentInput < TICKET_PRICE) {
    alert(LESS_THAN_TICKET_PRICE_MESSAGE);
    return;
  }

  lotto.setTickets(createTickets(ticketAmount));
  updateTicketListView(lotto.tickets);
  focusFirstWinningNumberInput();
};

export default lottoPurchaseHandler;
