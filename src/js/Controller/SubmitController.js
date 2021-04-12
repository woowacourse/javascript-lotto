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
  renderBalance,
} from "../View/receiptView.js";
import {
  showPurchaseResult,
  hidePurchaseResult,
  showModal,
  closeModal,
  hidePurchaseSection,
  showPurchaseSection,
} from "../Util/dom.js";
import TicketBundle from "../Model/TicketBundle.js";
import Balance from "../Model/Balance.js";
import WinningResult from "../Model/WinningResult.js";

export default class SubmitController {
  constructor() {
    this.ticketBundle = new TicketBundle();
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
    $(ELEMENT.MANUAL_PURCHASE_CONTAINER).addEventListener(
      "submit",
      this.handleManualPurchaseSubmit
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

    this.balance = new Balance(money);
    renderBalance(this.balance.balance);
    showPurchaseSection();
    $$(ELEMENT.WINNING_NUMBER)[0].focus();
  };

  handleManualPurchaseSubmit = (event) => {
    event.preventDefault();

    if (
      !isUnderCurrentBalance(
        this.balance.balance,
        STANDARD_NUMBER.ONE_TICKET_PRICE
      )
    ) {
      this.clearManualPurchaseInput();

      return;
    }

    const manualPurchaseLottoNumbers = this.ticketBundle.getManualPurchaseLottoNumbers();
    if (!isValidNumbers(manualPurchaseLottoNumbers)) {
      this.clearManualPurchaseInput();

      return;
    }

    const tickets = this.ticketBundle.addManualTicket(
      manualPurchaseLottoNumbers
    );

    renderBalance(this.balance.subtractionManualPurchaseBalance());

    Array.from($$(ELEMENT.MANUAL_PURCHASE_LOTTO_NUMBER)).map(
      (number) => (number.value = "")
    );

    this.renderTickets(tickets.length);

    $$(ELEMENT.MANUAL_PURCHASE_LOTTO_NUMBER)[0].focus();
    $$(ELEMENT.WINNING_NUMBER)[0].focus();
  };

  handleAutoPurchaseSubmit = (event) => {
    event.preventDefault();

    const autoPurchasePrice = $(ELEMENT.AUTO_PURCHASE_INPUT).value;

    if (!isUnderCurrentBalance(this.balance.balance, autoPurchasePrice)) {
      this.clearAutoPurchaseInput();

      return;
    }

    if (!isValidMoney(autoPurchasePrice)) {
      this.clearAutoPurchaseInput();

      return;
    }

    renderBalance(
      this.balance.subtractionAutoPurchaseBalance(autoPurchasePrice)
    );

    const autoTicketLength = this.ticketBundle.getAutoTicketLength(
      autoPurchasePrice
    );

    this.renderTickets(autoTicketLength);
    this.clearAutoPurchaseInput();
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
      this.clearWinningBonusNumber();

      return;
    }
    this.winningResult.setNumbers(inputWinningNumbers, inputBonusNumber);

    const winningDatas = this.winningResult.getWinningDatas(
      this.balance.initialBalance,
      this.ticketBundle.ticketBundle
    );
    this.renderWinningResult(winningDatas);
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

  renderTickets = (ticketCount) => {
    printPurchaseAmountLabel(ticketCount);
    printTicketHorizontal(ticketCount);
    showPurchaseResult();
  };

  renderWinningResult = (winningDatas) => {
    printWinningResult(winningDatas);
    showModal();
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

  clearManualPurchaseInput = () => {
    Array.from($$(ELEMENT.MANUAL_PURCHASE_LOTTO_NUMBER)).map(
      (number) => (number.value = "")
    );
    $$(ELEMENT.MANUAL_PURCHASE_LOTTO_NUMBER)[0].focus();
  };

  clearAutoPurchaseInput = () => {
    $(ELEMENT.AUTO_PURCHASE_INPUT).value = "";
    $(ELEMENT.AUTO_PURCHASE_INPUT).focus();
  };

  initializeStates = () => {
    this.ticketBundle = new TicketBundle();
    this.winningResult = new WinningResult();
  };
}
