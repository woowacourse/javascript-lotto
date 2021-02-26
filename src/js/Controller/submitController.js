import { ELEMENT, STANDARD_NUMBER } from "../Util/constants.js";
import { $, $$ } from "../Util/querySelector.js";
import { isValidMoney } from "../Util/validator.js";
import {
  printPurchaseAmountLabel,
  printTicketHorizontal,
  printTicketVertical,
} from "../View/receiptView.js";
import { showPurchaseResult } from "../Handler/elementHandler.js";
import TicketBundle from "../Model/TicketBundle.js";

export const initializeEvents = () => {
  $(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON).addEventListener(
    "click",
    handlePurchaseAmountSubmit
  );
  $(ELEMENT.TOGGLE_BUTTON).addEventListener("click", handleToggleButton);
  $(ELEMENT.WIN_NUMBER_CONTAINER).addEventListener(
    "submit",
    handleResultSubmit
  );
};

const handlePurchaseAmountSubmit = () => {
  const money = $(ELEMENT.PURCHASE_AMOUNT_INPUT).value;

  if (!isValidMoney(money)) return;

  TicketBundle.makeTicketBundle(money / STANDARD_NUMBER.ONE_TICKET_PRICE);
  renderTickets(TicketBundle.ticketBundle.length);
};

const renderTickets = (ticketCount) => {
  printPurchaseAmountLabel(ticketCount);
  printTicketHorizontal(ticketCount);
  showPurchaseResult();
};

const handleToggleButton = (event) => {
  event.target.checked
    ? printTicketVertical(TicketBundle.ticketBundle)
    : printTicketHorizontal(TicketBundle.ticketBundle.length);
};

const handleResultSubmit = (event) => {
  event.preventDefault();

  const inputWinningNumbers = Array.from($$(ELEMENT.WINNING_NUMBER)).map(
    (number) => number.value
  );
  const inputBonusNumber = $(ELEMENT.BONUS_NUMBER).value;
};
