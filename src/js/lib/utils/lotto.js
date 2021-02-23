import {
  TICKET_NUMBER_AMOUNT,
  TICKET_MIN_NUMBER,
  TICKET_MAX_NUMBER,
} from '../constants/lotto.js';

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

function getProfitPercent(winners, ticketAmount) {
  // 상수화 ㄱㄱ
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

function getRank(ticket, winningNumber) {
  // map 안써도됨
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

export { getTicketNumber, getProfitPercent, getWinners };
