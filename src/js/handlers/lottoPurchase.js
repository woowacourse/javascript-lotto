import { lotto } from '../model/lotto.js';
import $ from '../lib/utils/dom.js';
import { LESS_THAN_TICKET_PRICE_MESSAGE } from '../lib/constants/alertMessage.js';
import { TICKET_PRICE } from '../lib/constants/lotto.js';
import { getTicketNumber } from '../lib/utils/lotto.js';
import { createTicketTemplate } from '../lib/utils/template.js';

const updateTicketListView = tickets => {
  const ticketsTemplate = tickets.reduce(
    (acc, ticket) => acc + createTicketTemplate(ticket),
    ''
  );

  $('#ticket-list').innerHTML = ticketsTemplate;
  $('#ticket-count').innerHTML = `총 ${tickets.length}개를 구매하였습니다.`;
  $('#toggle-detail-mode').classList.remove('hide');
};

const lottoPurchaseHandler = event => {
  event.preventDefault();
  const paymentInput = event.target.elements['payment-input'].value;
  const ticketAmount = Math.floor(Number(paymentInput) / TICKET_PRICE);

  if (Number(paymentInput) < TICKET_PRICE) {
    alert(LESS_THAN_TICKET_PRICE_MESSAGE);
    return;
  }

  lotto.setTickets([...Array(ticketAmount)].map(() => getTicketNumber()));
  updateTicketListView(lotto.tickets);
};

export default lottoPurchaseHandler;
