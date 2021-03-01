import createRandomNumber from '../utils/random.js';
import {
  TICKET_NUMBER_AMOUNT,
  TICKET_MIN_NUMBER,
  TICKET_MAX_NUMBER,
  TICKET_PRIZE,
  TICKET_PRICE,
} from '../constants/lotto.js';

const getTicketNumber = () => {
  const ticketNumber = new Set();

  while (ticketNumber.size < TICKET_NUMBER_AMOUNT) {
    ticketNumber.add(createRandomNumber(TICKET_MIN_NUMBER, TICKET_MAX_NUMBER));
  }

  return [...ticketNumber];
};

const createTickets = ticketAmount =>
  [...Array(ticketAmount)].map(() => getTicketNumber());

const getTicketAmount = money => Math.floor(money / TICKET_PRICE);

const getProfitPercent = (winners, ticketAmount) => {
  let totalProfit = 0;
  const paymentAmount = ticketAmount * 1000;

  for (const winner in winners) {
    if (Object.hasOwnProperty.call(winners, winner)) {
      totalProfit += winners[winner] * TICKET_PRIZE[winner];
    }
  }

  return ((totalProfit - paymentAmount) / paymentAmount) * 100;
};

const getRank = (ticket, { main, bonus }) => {
  const score = ticket.filter(number => main.includes(number)).length;

  if (score === 5 && ticket.includes(bonus)) {
    return 'second';
  }

  if (score < 3) {
    return 'loser';
  }

  return ['fifth', 'fourth', 'third', 'first'][score - 3];
};

const getWinners = (tickets, winningNumber) => {
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
};

export { createTickets, getProfitPercent, getWinners, getTicketAmount };
