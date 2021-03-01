import { $ } from '../utils/dom.js';

const updateIssuableTicketAmount = amount => {
  $('#issuable-ticket-amount').innerText = amount;
};

export { updateIssuableTicketAmount };
