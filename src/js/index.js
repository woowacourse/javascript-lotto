/* eslint-disable no-use-before-define */
/* eslint-disable spaced-comment */

import $ from './utils/dom.js';

// const $showResultButton = $('.open-result-modal-button');
// const $modalClose = $('.modal-close');
// const $modal = $('.modal');
// const $lottoNumbersToggleButton = $(
//   '.lotto-numbers-toggle-button'
// );

// const onModalShow = () => {
//   $modal.classList.add('open');
// };

// const onModalClose = () => {
//   $modal.classList.remove('open');
// };

// $showResultButton.addEventListener('click', onModalShow);
// $modalClose.addEventListener('click', onModalClose);

///////// 구입 금액
const TICKET_PRICE = 1000;
const paymentForm = $('#payment-submit');

paymentForm.addEventListener('submit', event => {
  event.preventDefault();
  console.log('hi');
  const paymentInput = event.target.elements['payment-input'].value;

  ///////// 티켓 생성
  const ticketAmount = Math.floor(Number(paymentInput) / TICKET_PRICE);
  const ticketNumbers = [...Array(ticketAmount)].map(() => getTicketNumber());

  const ticketsHTML = ticketNumbers
    .map(ticketNumber => createTicktHTML(ticketNumber))
    .join('');

  $('#ticket-list').innerHTML = ticketsHTML;
  $('#ticket-count').innerHTML = `총 ${ticketAmount}개를 구매하였습니다.`;
  $('#toggle-detail-mode').classList.remove('hide');
});

function createTicktHTML(ticketNumber) {
  return `<div>
            <span class="mx-1 text-4xl">🎟️ </span>
            <span>${ticketNumber.join(', ')}</span> 
          </div>`;
}

function getTicketNumber() {
  const ticketNumber = new Set();

  while (ticketNumber.size <= 6) {
    ticketNumber.add(getRandomNumber(1, 45));
  }

  return [...ticketNumber];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
