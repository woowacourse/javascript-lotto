import { Element, StandardNumber } from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";
import { isValidMoney } from "../Util/validator.js";
import {
  printPurchaseAmountLabel,
  printTicketHorizontal,
  printTicketVertical,
} from "../View/receiptView.js";
import { showPurchaseResult } from "../Handler/elementHandler.js";
import Ticket from "../Model/TicketBundle.js";

export const initializeEvents = () => {
  $(Element.PURCHASE_AMOUNT_SUBMIT_BUTTON).addEventListener(
    "click",
    handlePurchaseAmountSubmit
  );
  $(Element.TOGGLE_BUTTON).addEventListener("click", handleToggleButton);
};

const handlePurchaseAmountSubmit = () => {
  const money = $(Element.PURCHASE_AMOUNT_INPUT).value;

  if (!isValidMoney(money)) return;

  Ticket.makeTicketBundle(money / StandardNumber.ONE_TICKET_PRICE);
  renderTickets(Ticket.ticketBundle.length);
};

const renderTickets = (ticketCount) => {
  printPurchaseAmountLabel(ticketCount);
  printTicketHorizontal(ticketCount);
  showPurchaseResult();
};

const handleToggleButton = (event) => {
  event.target.checked
    ? printTicketVertical(Ticket.ticketBundle)
    : printTicketHorizontal(Ticket.ticketBundle.length);
};
