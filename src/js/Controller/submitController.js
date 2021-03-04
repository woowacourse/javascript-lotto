import { ELEMENT, STANDARD_NUMBER } from "../Util/constants.js";
import { $, $$ } from "../Util/querySelector.js";
import { isValidMoney, isValidWinningNumbers } from "../Util/validator.js";
import {
  printPurchaseAmountLabel,
  printTicketHorizontal,
  printTicketVertical,
  printWinningResult,
} from "../View/receiptView.js";
import {
  showPurchaseResult,
  resetPurchaseResult,
  showModal,
  closeModal,
  showPurchaseOption,
} from "../Handler/elementHandler.js";
import TicketBundle from "../Model/TicketBundle.js";
import Result from "../Model/Result.js";

export const initializeEvents = () => {
  $(ELEMENT.PURCHASE_AMOUNT_CONTAINER).addEventListener(
    "submit",
    handlePurchaseAmountSubmit
  );
  $(ELEMENT.TOGGLE_BUTTON).addEventListener("click", handleToggleButton);
  $(ELEMENT.WIN_NUMBER_CONTAINER).addEventListener(
    "submit",
    handleResultSubmit
  );
  $(ELEMENT.MODAL_CLOSE).addEventListener("click", closeModal);
  $(ELEMENT.RESTART_BUTTON).addEventListener("click", handleRestartButton);
};

const handlePurchaseAmountSubmit = (event) => {
  event.preventDefault();

  const money = $(ELEMENT.PURCHASE_AMOUNT_INPUT).value;

  if (!isValidMoney(money)) {
    clearPurchaseAmountInput();
    return;
  }

  disableElement(ELEMENT.PURCHASE_AMOUNT_INPUT);
  disableElement(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON);
  $(ELEMENT.TICKET_IMAGE_NUMBER_CONTAINER).dataset.money = money;
  TicketBundle.makeTicketBundle(money / STANDARD_NUMBER.ONE_TICKET_PRICE);

  renderTickets(TicketBundle.ticketBundle.length);
  $$(ELEMENT.WINNING_NUMBER)[0].focus();
};

const renderTickets = (ticketCount) => {
  printPurchaseAmountLabel(ticketCount);
  printTicketHorizontal(ticketCount);
  showPurchaseOption();
  // showPurchaseResult();
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

  if (!isValidWinningNumbers(inputWinningNumbers.concat(inputBonusNumber))) {
    clearWinningBonusNumber();
    return;
  }

  setNumbers(inputWinningNumbers, inputBonusNumber);
  setWinningResult(TicketBundle.ticketBundle);
  renderWinningResult();
};

const setNumbers = (winningNumbers, bonusNumber) => {
  Result.setWinningNumbers(winningNumbers);
  Result.setBonusNumber(bonusNumber);
};

const setWinningResult = (ticketBundle) => {
  Result.setRanks(ticketBundle);
  Result.setMatchingCounts();
};

const renderWinningResult = () => {
  printWinningResult();
  showModal();
};

const handleRestartButton = () => {
  closeModal();
  clearWinningBonusNumber();
  clearPurchaseAmountInput();
  resetPurchaseResult();
};

const clearPurchaseAmountInput = () => {
  $(ELEMENT.PURCHASE_AMOUNT_INPUT).value = "";
  $(ELEMENT.PURCHASE_AMOUNT_INPUT).focus();
};

const clearWinningBonusNumber = () => {
  Array.from($$(ELEMENT.WINNING_NUMBER)).map((number) => (number.value = ""));
  $(ELEMENT.BONUS_NUMBER).value = "";
  $$(ELEMENT.WINNING_NUMBER)[0].focus();
};

const disableElement = (element) => {
  $(element).disabled = true;
};
