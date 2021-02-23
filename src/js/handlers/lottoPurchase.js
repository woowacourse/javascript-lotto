import { lottoData } from '../model/lottoData.js';
import $ from '../lib/utils/dom.js';
import { LESS_THAN_TICKET_PRICE_MESSAGE } from '../lib/constants/alertMessage.js';
import {
  TICKET_PRICE,
  TICKET_NUMBER_AMOUNT,
  TICKET_MIN_NUMBER,
  TICKET_MAX_NUMBER,
} from '../lib/constants/lotto.js';

const lottoPurchaseHandler = event => {
  event.preventDefault();
  const paymentInput = event.target.elements['payment-input'].value;

  if (Number(paymentInput) < TICKET_PRICE) {
    alert(LESS_THAN_TICKET_PRICE_MESSAGE);
    return;
  }

  lottoData.ticketAmount = Math.floor(Number(paymentInput) / TICKET_PRICE);
  lottoData.tickets = [...Array(lottoData.ticketAmount)].map(() =>
    getTicketNumber()
  );

  const ticketsHTML = lottoData.tickets
    .map(ticketNumber => createTicktHTML(ticketNumber))
    .join('');

  $('#ticket-list').innerHTML = ticketsHTML;
  $(
    '#ticket-count'
  ).innerHTML = `총 ${lottoData.ticketAmount}개를 구매하였습니다.`;
  $('#toggle-detail-mode').classList.remove('hide');
};

function createTicktHTML(ticketNumber) {
  return `<div>
            <span class="mx-1 text-4xl">🎟️ </span>
            <span class="ticket-number hide">${ticketNumber.join(', ')}</span>
          </div>`;
}

function getTicketNumber() {
  const ticketNumber = new Set();

  while (ticketNumber.size < TICKET_NUMBER_AMOUNT) {
    ticketNumber.add(getRandomNumber(TICKET_MIN_NUMBER, TICKET_MAX_NUMBER));
  }

  return [...ticketNumber];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default lottoPurchaseHandler;
