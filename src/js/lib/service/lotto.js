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

  for (const [idx, winner] of winners.entries()) {
    totalProfit += winner * TICKET_PRIZE[idx];
  }

  return ((totalProfit - paymentAmount) / paymentAmount) * 100;
};

const SCORE = {
  SIX: 6,
  FIVE: 5,
  FOUR: 4,
  THREE: 3,
};

const getRank = (ticket, { main, bonus }) => {
  const score = ticket.filter(number => main.includes(number)).length;

  const scoreMap = {
    [SCORE.SIX]: 0,
    [SCORE.FIVE]: ticket.includes(bonus) ? 1 : 2,
    [SCORE.FOUR]: 3,
    [SCORE.THREE]: 4,
  };

  return scoreMap[score] ?? -1;
};

const getWinners = (tickets, winningNumber) => {
  const winners = [0, 0, 0, 0, 0];

  tickets.forEach(ticket => {
    const rank = getRank(ticket, winningNumber);
    if (rank !== -1) {
      winners[rank] += 1;
    }
  });

  return winners;
};

export { createTickets, getProfitPercent, getWinners, getTicketAmount };
