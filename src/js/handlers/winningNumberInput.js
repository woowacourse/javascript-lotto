/* eslint-disable no-use-before-define */
import { lottoData } from '../model/lottoData.js';
import $ from '../utils/dom.js';

const winningNumberInputHandler = event => {
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
};

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

export default winningNumberInputHandler;
