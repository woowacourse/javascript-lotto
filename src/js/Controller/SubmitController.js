import { ELEMENT, STANDARD_NUMBER } from "../Util/constants.js";
import { $, $$ } from "../Util/querySelector.js";
import {
  isValidMoney,
  isValidNumbers,
  isUnderCurrentBalance,
} from "../Util/validator.js";
import {
  printPurchaseAmountLabel,
  printTicketHorizontal,
  printTicketVertical,
  printWinningResult,
} from "../View/receiptView.js";
import { renderBalance } from "../View/receiptView.js";
import {
  showPurchaseResult,
  hidePurchaseResult,
  showModal,
  closeModal,
  showPurchaseSection,
  hidePurchaseSection,
} from "../Handler/elementHandler.js";
import TicketBundle from "../Model/TicketBundle.js";
import Balance from "../Model/Balance.js";
import WinningResult from "../Model/WinningResult.js";

export default class SubmitController {
  constructor() {
    this.ticketBundle = new TicketBundle();
    this.balance = new Balance();
    this.winningResult = new WinningResult();
  }

  initializeEvents = () => {
    $(ELEMENT.PURCHASE_CONTAINER).addEventListener(
      "submit",
      this.handlePurchaseAmountSubmit
    );
    $(ELEMENT.TOGGLE_BUTTON).addEventListener("click", this.handleToggleButton);
    $(ELEMENT.WIN_NUMBER_CONTAINER).addEventListener(
      "submit",
      this.handleResultSubmit
    );
    $(ELEMENT.MODAL_CLOSE).addEventListener("click", closeModal);
    $(ELEMENT.RESTART_BUTTON).addEventListener(
      "click",
      this.handleRestartButton
    );
    $(ELEMENT.SELF_PURCHASE_CONTAINER).addEventListener(
      "submit",
      this.handleSelfPurchaseSubmit
    );
    $(ELEMENT.AUTO_PURCHASE_CONTAINER).addEventListener(
      "submit",
      this.handleAutoPurchaseSubmit
    );
  };

  handlePurchaseAmountSubmit = (event) => {
    event.preventDefault();

    const money = $(ELEMENT.PURCHASE_AMOUNT_INPUT).value;

    if (!isValidMoney(money)) {
      this.clearPurchaseAmountInput();

      return;
    }

    this.balance.setBalance(money);
    renderBalance(this.balance.balance);
    this.renderPurchaseSection();
    $$(ELEMENT.WINNING_NUMBER)[0].focus();
  };

  renderPurchaseSection = () => {
    showPurchaseSection();
  };

  handleSelfPurchaseSubmit = (event) => {
    event.preventDefault();

    if (
      !isUnderCurrentBalance(
        this.balance.balance,
        STANDARD_NUMBER.ONE_TICKET_PRICE
      )
    ) {
      clearSelfPurchaseInput();

      return;
    }

    const selfPurchaseLottoNumbers = Array.from(
      $$(ELEMENT.SELF_PURCHASE_LOTTO_NUMBER)
    ).map((number) => Number(number.value));

    if (!isValidNumbers(selfPurchaseLottoNumbers)) {
      clearSelfPurchaseInput();

      return;
    }
    const tickets = this.ticketBundle.setSelfTicket(selfPurchaseLottoNumbers);

    this.balance.subtractionSelfPurchaseBalance();
    renderBalance(this.balance.balance);

    Array.from($$(ELEMENT.SELF_PURCHASE_LOTTO_NUMBER)).map(
      (number) => (number.value = "")
    );

    this.renderTickets(tickets.length);

    $$(ELEMENT.SELF_PURCHASE_LOTTO_NUMBER)[0].focus();
    $$(ELEMENT.WINNING_NUMBER)[0].focus();
  };

  handleAutoPurchaseSubmit = (event) => {
    event.preventDefault();

    const autoPurchasePrice = $(ELEMENT.AUTO_PURCHASE_INPUT).value;

    if (!isUnderCurrentBalance(this.balance.balance, autoPurchasePrice)) {
      clearAutoPurchaseInput();

      return;
    }

    if (!isValidMoney(autoPurchasePrice)) {
      clearAutoPurchaseInput();

      return;
    }

    this.balance.subtractionAutoPurchaseBalance(autoPurchasePrice);
    renderBalance(this.balance.balance);

    const tickets = this.ticketBundle.makeAutoTicketBundle(
      autoPurchasePrice / STANDARD_NUMBER.ONE_TICKET_PRICE
    );

    this.renderTickets(tickets.length);
    $(ELEMENT.AUTO_PURCHASE_INPUT).value = "";
    $(ELEMENT.AUTO_PURCHASE_INPUT).focus();
  };

  renderTickets = (ticketCount) => {
    printPurchaseAmountLabel(ticketCount);
    printTicketHorizontal(ticketCount);
    showPurchaseResult();
  };

  handleToggleButton = (event) => {
    event.target.checked
      ? printTicketVertical(this.ticketBundle.ticketBundle)
      : printTicketHorizontal(this.ticketBundle.ticketBundle.length);
  };

  handleResultSubmit = (event) => {
    event.preventDefault();

    const inputWinningNumbers = Array.from($$(ELEMENT.WINNING_NUMBER)).map(
      (number) => number.value
    );
    const inputBonusNumber = $(ELEMENT.BONUS_NUMBER).value;

    if (!isValidNumbers(inputWinningNumbers.concat(inputBonusNumber))) {
      clearWinningBonusNumber();

      return;
    }

    this.setNumbers(inputWinningNumbers, inputBonusNumber);
    const initialBalance = this.balance.initialBalance;
    const winningDatas = this.makeWinningDatas(initialBalance);
    this.renderWinningResult(winningDatas);
  };

  setNumbers = (winningNumbers, bonusNumber) => {
    this.winningResult.setWinningNumbers(winningNumbers);
    this.winningResult.setBonusNumber(bonusNumber);
  };

  makeWinningDatas = (initialBalance) => {
    const matchingCounts = this.setWinningResult(
      this.ticketBundle.ticketBundle
    );
    const totalPrize = this.getTotalPrize();
    const earningRate = ((totalPrize - initialBalance) / initialBalance) * 100;

    return { matchingCounts, earningRate };
  };

  getTotalPrize = () => {
    return this.winningResult.calculateTotalPrize();
  };

  renderWinningResult = (winningDatas) => {
    printWinningResult(winningDatas);
    showModal();
  };

  setWinningResult = (ticketBundle) => {
    const ranks = this.winningResult.setRanks(ticketBundle);
    const matchingCounts = this.winningResult.setMatchingCounts(ranks);

    return matchingCounts;
  };

  handleRestartButton = () => {
    closeModal();
    this.initializeStates();
    this.clearWinningBonusNumber();
    this.clearPurchaseAmountInput();
    hidePurchaseResult();
    hidePurchaseSection();
    $(ELEMENT.TOGGLE_BUTTON).checked = false;
  };

  clearPurchaseAmountInput = () => {
    $(ELEMENT.PURCHASE_AMOUNT_INPUT).value = "";
    $(ELEMENT.PURCHASE_AMOUNT_INPUT).focus();
  };

  clearWinningBonusNumber = () => {
    Array.from($$(ELEMENT.WINNING_NUMBER)).map((number) => (number.value = ""));
    $(ELEMENT.BONUS_NUMBER).value = "";
    $$(ELEMENT.WINNING_NUMBER)[0].focus();
  };

  clearSelfPurchaseInput = () => {
    Array.from($$(ELEMENT.SELF_PURCHASE_LOTTO_NUMBER)).map(
      (number) => (number.value = "")
    );
    $$(ELEMENT.SELF_PURCHASE_LOTTO_NUMBER)[0].focus();
  };

  clearAutoPurchaseInput = () => {
    $(ELEMENT.AUTO_PURCHASE_INPUT).value = "";
  };

  initializeStates = () => {
    this.ticketBundle = new TicketBundle();
    this.winningResult = new WinningResult();
  };
}
