import Ticket from '../model/Ticket.js';
import { $, $$ } from '../utils/querySelector.js';
import { isDuplicate, isValidRange, isEqual } from '../utils/validator.js';
import { ERR_MESSAGE } from '../utils/constant.js';
import { closeModal } from '../utils/setProperty.js';
import { renderSelfResultTable } from '../view/viewPurchaseModal.js';
import { renderPurchaseResultSection } from '../view/viewPurchaseResultSection.js';
import { showWinningNumberInputForm } from '../view/viewWinningNumberInputForm.js';

const selfTicketsNumbers = [];

const setTickets = (lotto) => {
  selfTicketsNumbers.forEach((selfTicketNumbers) => {
    lotto.addTicket(new Ticket(selfTicketNumbers));
  });

  const amountOfRestTicket = lotto.getAmount() - selfTicketsNumbers.length;

  for (let i = 0; i < amountOfRestTicket; i++) {
    lotto.addTicket(new Ticket());
  }
};

export const handlePurchaseModal = ({ target }, lotto) => {
  if (target.id === 'purchase-modal__auto-input-form') {
    setTickets(lotto);
    renderPurchaseResultSection(lotto);
    showWinningNumberInputForm();
    closeModal($('#purchase-modal'));
    return;
  }

  if (target.id === 'purchase-modal__self-input-form') {
    if (isEqual(lotto.getAmount(), selfTicketsNumbers.length)) {
      return alert(ERR_MESSAGE.LOTTO.OVER_PURCHASE);
    }

    const selfNumbers = [...$$('.self-number')]
      .map((selfNumber) => Number(selfNumber.value))
      .sort((a, b) => a - b);

    if (!isValidRange(selfNumbers)) {
      return alert(ERR_MESSAGE.WINNING_NUMBER.OUT_OF_RANGE);
    }

    if (isDuplicate(selfNumbers)) {
      return alert(ERR_MESSAGE.WINNING_NUMBER.DUPLICATE);
    }

    selfTicketsNumbers.push(selfNumbers);
    renderSelfResultTable(selfTicketsNumbers.length, selfNumbers);

    $$('.self-number').forEach((selfNumber) => {
      selfNumber.value = '';
    });
  }
};
