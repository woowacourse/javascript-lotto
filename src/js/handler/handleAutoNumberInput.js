import Ticket from '../model/Ticket.js';
import { $ } from '../utils/querySelector.js';
import { closeModal } from '../utils/setProperty.js';
import { renderPurchaseResultSection } from '../view/viewPurchaseResultSection.js';
import { showWinningNumberInputForm } from '../view/viewWinningNumberInputForm.js';

const setTickets = (lotto) => {
  const inputtedSelfNumbers = lotto.getInputtedSelfNumbers();
  const amountOfSelfTicket = inputtedSelfNumbers.length;
  const amountOfAutoTicket = lotto.getAmount() - amountOfSelfTicket;

  for (let i = 0; i < amountOfSelfTicket; i++) {
    lotto.addTicket(new Ticket(inputtedSelfNumbers.pop()));
  }

  for (let i = 0; i < amountOfAutoTicket; i++) {
    lotto.addTicket(new Ticket());
  }
};

export const handleAutoNumberInput = (lotto) => {
  setTickets(lotto);
  renderPurchaseResultSection(lotto);
  showWinningNumberInputForm();
  closeModal($('#purchase-modal'));
  return;
};
