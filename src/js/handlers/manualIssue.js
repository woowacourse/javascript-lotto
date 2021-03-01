import { DUPLICATE_NUMBER_MESSAGE } from '../lib/constants/alertMessage.js';
import { lotto } from '../lib/state/lotto.js';
import { hasDuplicateInArray } from '../lib/utils/validation.js';
import { updateLottoIssueModalView } from '../lib/viewController/lottoIssueModal.js';

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

  if (hasDuplicateInArray(newTicket)) {
    alert(DUPLICATE_NUMBER_MESSAGE);
    return;
  }

  lotto.addTickets(newTicket);
  lotto.decreaseIssuableTicketAmount();
  updateLottoIssueModalView();
  event.target.reset();
};

export default manualIssueHandler;
