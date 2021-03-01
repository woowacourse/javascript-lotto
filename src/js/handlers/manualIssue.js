import { lotto } from '../lib/state/lotto.js';
import {
  updateIssuableTicketAmountView,
  updateIssuedTicketBoxView,
} from '../lib/viewController/lottoIssueModal.js';

const manualIssueHandler = event => {
  event.preventDefault();
  const {
    'manual-first': $first,
    'manual-second': $second,
    'manual-third': $third,
    'manual-fourth': $fourth,
    'manual-fifth': $fifth,
    'manual-sixth': $sixth,
  } = event.target.elements;

  const newTicket = [
    $first,
    $second,
    $third,
    $fourth,
    $fifth,
    $sixth,
  ].map(({ value }) => Number(value));

  lotto.addTickets(newTicket);
  updateIssuedTicketBoxView();
  lotto.decreaseIssuableTicketAmount();
  updateIssuableTicketAmountView();
};

export default manualIssueHandler;
