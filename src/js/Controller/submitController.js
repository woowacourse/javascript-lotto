import { ELEMENT, STANDARD_NUMBER } from "../Util/constants.js";
import { $, $$ } from "../Util/querySelector.js";
import { isValidMoney, isValidNumbers } from "../Util/validator.js";
import {
  printPurchaseAmountLabel,
  printTicketHorizontal,
  printTicketVertical,
  printWinningResult,
} from "../View/receiptView.js";
import {
  showPurchaseResult,
  hidePurchaseResult,
  showModal,
  closeModal,
  showPurchaseSection,
} from "../Handler/elementHandler.js";
import ticketBundle from "../Model/TicketBundle.js";
import winningResult from "../Model/WinningResult.js";

export const initializeEvents = () => {
  $(ELEMENT.PURCHASE_CONTAINER).addEventListener(
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
  $("#self-purchase-container").addEventListener(
    "submit",
    handleSelfPurchaseSubmit
  );
  $("#auto-purchase-container").addEventListener(
    "submit",
    handleAutoPurchaseSubmit
  );
};

const handlePurchaseAmountSubmit = (event) => {
  event.preventDefault();

  const money = $(ELEMENT.PURCHASE_AMOUNT_INPUT).value;

  if (!isValidMoney(money)) {
    clearPurchaseAmountInput();
    return;
  }

  $(ELEMENT.TICKET_IMAGE_NUMBER_CONTAINER).dataset.money = money;

  renderPurchaseSection();
  // const tickets = ticketBundle.makeTicketBundle(
  //   money / STANDARD_NUMBER.ONE_TICKET_PRICE
  // );
  // renderTickets(tickets.length);
  // $$(ELEMENT.WINNING_NUMBER)[0].focus();
};

const renderPurchaseSection = () => {
  showPurchaseSection();
};

const handleSelfPurchaseSubmit = (event) => {
  event.preventDefault();

  const selfPurchaseLottoNumbers = Array.from(
    $$(".self-purchase-lotto-number")
  ).map((number) => Number(number.value));

  if (!isValidNumbers(selfPurchaseLottoNumbers)) {
    return;
  }
  const tickets = ticketBundle.setSelfTicket(selfPurchaseLottoNumbers);

  Array.from($$(".self-purchase-lotto-number")).map(
    (number) => (number.value = "")
  );
  $$(".self-purchase-lotto-number")[0].focus();
  $$(ELEMENT.WINNING_NUMBER)[0].focus();
};

const handleAutoPurchaseSubmit = (event) => {
  event.preventDefault();

  const autoPurchasePrice = $("#auto-purchase-input").value;

  if (!isValidMoney(autoPurchasePrice)) {
    return;
  }

  const tickets = ticketBundle.makeAutoTicketBundle(
    autoPurchasePrice / STANDARD_NUMBER.ONE_TICKET_PRICE
  );

  console.log(ticketBundle.ticketBundle);
  $("#auto-purchase-input").value = "";
  $("#auto-purchase-input").focus();
};

// const renderTickets = (ticketCount) => {
//   printPurchaseAmountLabel(ticketCount);
//   printTicketHorizontal(ticketCount);
//   showPurchaseResult();
// };

const handleToggleButton = (event) => {
  event.target.checked
    ? printTicketVertical(ticketBundle.ticketBundle)
    : printTicketHorizontal(ticketBundle.ticketBundle.length);
};

const handleResultSubmit = (event) => {
  event.preventDefault();

  const inputWinningNumbers = Array.from($$(ELEMENT.WINNING_NUMBER)).map(
    (number) => number.value
  );
  const inputBonusNumber = $(ELEMENT.BONUS_NUMBER).value;

  if (!isValidNumbers(inputWinningNumbers.concat(inputBonusNumber))) {
    clearWinningBonusNumber();
    return;
  }

  setNumbers(inputWinningNumbers, inputBonusNumber);
  const matchingCounts = setWinningResult(ticketBundle.ticketBundle);
  renderWinningResult(matchingCounts);
};

const setNumbers = (winningNumbers, bonusNumber) => {
  winningResult.setWinningNumbers(winningNumbers);
  winningResult.setBonusNumber(bonusNumber);
};

export const getTotalPrize = () => {
  return winningResult.calculateTotalPrize();
};

const setWinningResult = (ticketBundle) => {
  const ranks = winningResult.setRanks(ticketBundle);
  const matchingCounts = winningResult.setMatchingCounts(ranks);

  return matchingCounts;
};

const renderWinningResult = (matchingCounts) => {
  printWinningResult(matchingCounts);
  showModal();
};

const handleRestartButton = () => {
  closeModal();
  initializeStates();
  clearWinningBonusNumber();
  clearPurchaseAmountInput();
  hidePurchaseResult();
  $(ELEMENT.TOGGLE_BUTTON).checked = false;
};

const initializeStates = () => {
  ticketBundle.initializeTicketBundle();
  winningResult.initializeWinningResult();
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
