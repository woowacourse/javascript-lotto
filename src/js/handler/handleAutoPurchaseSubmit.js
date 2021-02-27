import Ticket from '../model/Ticket.js';
import { $ } from '../utils/querySelector.js';
import { VALUE, ERR_MESSAGE } from '../utils/constant.js';
import { renderPurchaseBudget } from '../view/viewPurchaseSection.js';
import { renderPurchaseResultSection } from '../view/viewPurchaseResultSection.js';

const isValidTicketCount = (currentBudget, purchaseTicketCount) => {
  return currentBudget >= purchaseTicketCount * VALUE.LOTTO.TICKET_PRICE;
};

export const handleAutoPurchaseSubmit = (lotto) => {
  const $autoPurchaseInput = $('#auto-purchase-input-form__input');
  const purchaseTicketCount = $autoPurchaseInput.value;
  const currentBudget = lotto.getPurchaseBudget();

  if (!isValidTicketCount(currentBudget, purchaseTicketCount)) {
    alert(ERR_MESSAGE.LOTTO.INVALID_TICKET_COUNT);
    $autoPurchaseInput.value = '';
    return;
  }

  lotto.setPurchaseBudget(
    currentBudget - purchaseTicketCount * VALUE.LOTTO.TICKET_PRICE,
  );

  for (let i = 0; i < purchaseTicketCount; i++) {
    lotto.addTicket(new Ticket());
  }

  $autoPurchaseInput.value = '';
  renderPurchaseBudget(lotto);
  renderPurchaseResultSection(lotto);
};
