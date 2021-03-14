import { lotto } from '../state/lotto.js';
import { $, disableForm, enableForm } from '../utils/dom.js';
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
  $('#lotto-issue-end-button').innerText = lotto.issuableTicketAmount
    ? '나머지는 자동 구매'
    : '발급 완료';
};

const updateFormState = () => {
  lotto.issuableTicketAmount
    ? enableForm($('#manual-issue-form'))
    : disableForm($('#manual-issue-form'));
};

const updateLottoIssueModalView = () => {
  updateIssuableTicketAmountText();
  updateIssuedTicketBoxView();
  updateEndButtonText();
  updateFormState();
};

export { updateLottoIssueModalView };
