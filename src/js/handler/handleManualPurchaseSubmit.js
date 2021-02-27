import Ticket from '../model/Ticket.js';
import { $, $$ } from '../utils/querySelector.js';
import { isDuplicate } from '../utils/validator.js';
import { ERR_MESSAGE, VALUE } from '../utils/constant.js';
import { renderPurchaseBudget } from '../view/viewPurchaseSection.js';
import { renderPurchaseResultSection } from '../view/viewPurchaseResultSection.js';

const hasPurchaseBudget = (currentBudget) => {
  return currentBudget >= VALUE.LOTTO.TICKET_PRICE;
};

export const handleManualPurchaseSubmit = (lotto) => {
  const currentBudget = lotto.getPurchaseBudget();
  const chooseNumbers = $$('.choose-number');
  const inputNumbers = [...chooseNumbers].map((chooseNumber) =>
    Number(chooseNumber.value),
  );

  if (!hasPurchaseBudget(currentBudget)) {
    alert(ERR_MESSAGE.LOTTO.INVALID_TICKET_COUNT);
    return;
  }

  if (isDuplicate(inputNumbers)) {
    alert(ERR_MESSAGE.WINNING_NUMBER.DUPLICATE);
    return;
  }

  lotto.setPurchaseBudget(currentBudget - VALUE.LOTTO.TICKET_PRICE);
  lotto.addTicket(new Ticket(inputNumbers));
  chooseNumbers.forEach((chooseNumber) => (chooseNumber.value = ''));
  $('.choose-number').focus();
  renderPurchaseBudget(lotto);
  renderPurchaseResultSection(lotto);
};
