/* eslint-disable no-continue */
/* eslint-disable no-use-before-define */
/* eslint-disable spaced-comment */

import { lottoData } from './model.js';
import $ from './utils/dom.js';

const $showResultButton = $('.open-result-modal-button');
const $modalClose = $('.modal-close');
const $modal = $('.modal');
const $lottoNumbersToggleButton = $('.lotto-numbers-toggle-button');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);

///////// 구입 금액
const TICKET_PRICE = 1000;
const paymentForm = $('#payment-submit');

paymentForm.addEventListener('submit', event => {
  event.preventDefault();
  const paymentInput = event.target.elements['payment-input'].value;

  ///////// 티켓 생성
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
});

function createTicktHTML(ticketNumber) {
  return `<div>
            <span class="mx-1 text-4xl">🎟️ </span>
            <span class="ticket-number hide">${ticketNumber.join(', ')}</span> 
          </div>`;
}

function getTicketNumber() {
  const ticketNumber = new Set();

  while (ticketNumber.size < 6) {
    ticketNumber.add(getRandomNumber(1, 45));
  }

  return [...ticketNumber];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 디테일모드 토글

$('#toggle-detail-mode').addEventListener('change', event => {
  if (event.target.checked) {
    $('#ticket-list').classList.add('detail-mode');
    $('#ticket-list').classList.remove('d-flex');
  } else {
    $('#ticket-list').classList.remove('detail-mode');
    $('#ticket-list').classList.add('d-flex');
  }
});

// 결과 확인하기

$('#lotto-number-form').addEventListener('submit', event => {
  event.preventDefault();
  const {
    first,
    second,
    third,
    fourth,
    fifth,
    sixth,
    bonus,
  } = event.target.elements;
  const winningNumber = {
    main: [first, second, third, fourth, fifth, sixth].map(({ value }) =>
      Number(value)
    ),
    bonus: Number(bonus.value),
  };

  const winners = getWinners(lottoData.tickets, winningNumber);
  const profitPercent = getProfitPercent(winners, lottoData.ticketAmount);
  setResultModal(winners, profitPercent);
});

function getWinners(tickets, winningNumber) {
  const winners = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  tickets.forEach(ticket => {
    const rank = getRank(ticket, winningNumber);
    if (rank === 'loser') return;

    winners[rank] += 1;
  });

  return winners;
}

function getRank(ticket, winningNumber) {
  const score = ticket
    .map(number => winningNumber.main.includes(number))
    .filter(isTrue => isTrue).length;

  if (score === 5 && ticket.includes(winningNumber.bonus)) {
    return 'second';
  }

  if (score < 3) {
    return 'loser';
  }

  return ['fifth', 'fourth', 'third', 'first'][score - 3];
}

function getProfitPercent(winners, ticketAmount) {
  const ticketPrize = {
    first: 2000000000,
    second: 30000000,
    third: 1500000,
    fourth: 50000,
    fifth: 5000,
  };
  let totalProfit = 0;
  const paymentAmount = ticketAmount * 1000;

  for (const winner in winners) {
    if (Object.hasOwnProperty.call(winners, winner)) {
      totalProfit += winners[winner] * ticketPrize[winner];
    }
  }

  return ((totalProfit - paymentAmount) / paymentAmount) * 100;
}

function setResultModal(winners, profitPercent) {
  $('#fifth').innerText = `${winners.fifth}개`;
  $('#fourth').innerText = `${winners.fourth}개`;
  $('#third').innerText = `${winners.third}개`;
  $('#second').innerText = `${winners.second}개`;
  $('#first').innerText = `${winners.first}개`;
  $('#profit').innerText = `당신의 총 수익률은 ${profitPercent}%입니다.`;
}

$('#reset').addEventListener('click', () => {
  onModalClose();
  $('#ticket-list').innerHTML = '';
  lottoData.ticketAmount = 0;
  lottoData.tickets = [];
  $('#ticket-count').innerHTML = ``;
  $('#toggle-detail-mode').classList.add('hide');
  $('input[name=payment-input]').value = '';
});
