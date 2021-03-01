import { lotto } from '../state/lotto.js';
import { $ } from '../utils/dom.js';
import { createTicketTemplate } from './teamplates/ticket.js';

const updateIssuableTicketAmountText = () => {
  $('#issuable-ticket-amount').innerText = lotto.issuableTicketAmount;
};

const updateIssuedTicketBoxView = () => {
  $('#issued-ticket-list').innerHTML = lotto.tickets.reduce(
    (acc, ticket) => acc + createTicketTemplate(ticket),
    ''
  );
};

const updateEndButtonText = () => {
  if (!lotto.issuableTicketAmount) {
    $('#lotto-issue-end-button').innerText = '발급 완료';
  } else {
    $('#lotto-issue-end-button').innerText = '나머지는 자동 구매';
  }
};

const updateLottoIssueModalView = () => {
  updateIssuableTicketAmountText();
  updateIssuedTicketBoxView();
  updateEndButtonText();
};

export {
  updateLottoIssueModalView,
  updateIssuableTicketAmountText,
  updateIssuedTicketBoxView,
};
