import { app } from "../index.js";
import Ticket from "../Model/Ticket.js";
import { Element, StandardNumber } from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";
import { isValidMoney } from "../Util/validator.js";
import {
  printPurchaseAmountLabel,
  printTicketHorizontal,
  printTicketVertical,
} from "../View/receiptView.js";
import { showPurchaseResult } from "../Handler/elementHandler.js";

export const handlePurchaseAmountSubmit = () => {
  const money = $(Element.PURCHASE_AMOUNT_INPUT).value;

  if (!isValidMoney(money)) return;

  app.ticketCount = money / StandardNumber.ONE_TICKET_PRICE;

  publishTickets(app.ticketCount);
};

const publishTickets = (ticketCount) => {
  createTickets(ticketCount);
  renderTickets(ticketCount);
}; // 나중에 모델-로또로 가야함(?) 렌더 기능도 있는데(?)

const createTickets = (ticketCount) => {
  for (let i = 0; i < ticketCount; i++) {
    app.tickets.push(new Ticket());
  }
}; // 나중에 모델-로또로 가야함

const renderTickets = (ticketCount) => {
  printPurchaseAmountLabel(ticketCount);
  printTicketHorizontal(ticketCount);
  showPurchaseResult();
}; // 나중에 receiptView로 가야함

export const handleToggleButton = (event) => {
  if (event.target.checked) {
    printTicketVertical(app.tickets);
  } else {
    printTicketHorizontal(app.ticketCount);
  }
};

// <다음 단계에 필요한 코드 주석 처리>

// const $showResultButton = $('.open-result-modal-button');
// const $modalClose = $('.modal-close');
// const $modal = $('.modal');
// const $lottoNumbersToggleButton = $(".toggle-button");

// const onModalShow = () => {
//  $modal.classList.add('open')
// }

// const onModalClose = () => {
//  $modal.classList.remove('open')
// }

// $showResultButton.addEventListener('click', onModalShow)
// $modalClose.addEventListener('click', onModalClose)
