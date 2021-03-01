import { lotto } from '../state/lotto.js';
import { $ } from '../utils/dom.js';
import { createTicketTemplate } from './teamplates/ticket.js';

const updateIssuableTicketAmountView = () => {
  $('#issuable-ticket-amount').innerText = lotto.issuableTicketAmount;
};

const updateIssuedTicketBoxView = () => {
  $('#issued-ticket-list').innerHTML = lotto.tickets.reduce(
    (acc, ticket) => acc + createTicketTemplate(ticket),
    ''
  );
};

export { updateIssuableTicketAmountView, updateIssuedTicketBoxView };
