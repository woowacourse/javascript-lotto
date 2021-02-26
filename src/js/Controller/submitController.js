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
  onModalShow,
  onModalClose,
} from "../Handler/elementHandler.js";
import TicketBundle from "../Model/TicketBundle.js";
import Result from "../Model/Result.js";

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
  $(ELEMENT.MODAL_CLOSE).addEventListener("click", onModalClose);
};

const handlePurchaseAmountSubmit = () => {
  const money = $(ELEMENT.PURCHASE_AMOUNT_INPUT).value;

  if (!isValidMoney(money)) return;

  $(ELEMENT.TICKET_IMAGE_NUMBER_CONTAINER).dataset.money = money;
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

  if (!isValidNumbers(inputWinningNumbers.concat(inputBonusNumber))) {
    return;
  }

  getNumbers(inputWinningNumbers, inputBonusNumber);
  getWinningResult(TicketBundle.ticketBundle);
  renderWinningResult();
};

const getNumbers = (winningNumbers, bonusNumber) => {
  Result.getWinningNumbers(winningNumbers);
  Result.getBonusNumber(bonusNumber);
};

const getWinningResult = (ticketBundle) => {
  Result.getRanks(ticketBundle); // 당첨 순위 계산
  Result.calculateTotalPrize(); // 총합 계산하고 data-total-prize 넣어줌
};

const renderWinningResult = () => {
  printWinningResult(); // <receiptView - printWinningResult> html에 넣어줌 - 필요한 것: Result.rankCounts, data-total-prize, data-money
  onModalShow();
};
