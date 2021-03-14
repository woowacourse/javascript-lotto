import { DUPLICATE_NUMBER_MESSAGE } from '../lib/constants/alertMessage.js';
import { lotto } from '../lib/state/lotto.js';
import { hasDuplicateInArray } from '../lib/utils/validation.js';
import { updateLottoIssueModalView } from '../lib/viewController/lottoIssueModal.js';

const manualIssueHandler = event => {
  event.preventDefault();

  const manualInputs = [...event.target.elements].filter(element =>
    element.classList.contains('js-manual-input')
  );

  const newTicket = manualInputs.map(({ value }) => Number(value));

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
