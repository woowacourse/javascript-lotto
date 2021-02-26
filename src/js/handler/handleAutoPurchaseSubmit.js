import Ticket from '../model/Ticket.js';
import { $ } from '../utils/querySelector.js';
import { VALUE, ERR_MESSAGE } from '../utils/constant.js';
import { renderPurchaseBudget } from '../view/viewPurchaseSection.js';

const isValidTicketCount = (currentBudget, purchaseTicketCount) => {
  return currentBudget >= purchaseTicketCount * VALUE.LOTTO.TICKET_PRICE;
};

export const handleAutoPurchaseSubmit = (lotto) => {
  let purchaseTicketCount = $('#auto-purchase-input-form__input').value;
  const currentBudget = lotto.getPurchaseBudget();

  if (!isValidTicketCount(currentBudget, purchaseTicketCount)) {
    alert(ERR_MESSAGE.LOTTO.INVALID_TICKET_COUNT);
    return;
  }

  lotto.setPurchaseBudget(
    currentBudget - purchaseTicketCount * VALUE.LOTTO.TICKET_PRICE,
  );

  while (purchaseTicketCount--) {
    lotto.addTicket(new Ticket());
  }

  $('#auto-purchase-input-form__input').value = '';
  renderPurchaseBudget(lotto);
};
