import createRandomNumber from './random.js';
import {
  TICKET_NUMBERS_LENGTH,
  TICKET_PRICE,
  TICKET_MIN_NUMBER,
  TICKET_MAX_NUMBER,
  PRIZE_AMOUNT,
  SCORE,
  LOSERS_INDEX,
} from '../constants/lotto.js';

export const createTicket = () => {
  const ticket = new Set();

  while (ticket.size < TICKET_NUMBERS_LENGTH) {
    ticket.add(createRandomNumber(TICKET_MIN_NUMBER, TICKET_MAX_NUMBER));
  }

  return [...ticket];
};

export const getNumberOfTickets = value =>
  Math.floor(Number(value) / TICKET_PRICE);

export const getWinnerIndex = (ticket, winningNumber) => {
  const winnerIndex = {
    [SCORE.FIRST]: 0,
    [SCORE.SECOND]: ticket.includes(winningNumber.bonus) ? 1 : 2,
    [SCORE.THIRD]: 2,
    [SCORE.FOURTH]: 3,
  };
  const score = ticket.filter(number => winningNumber.main.includes(number))
    .length;

  return winnerIndex[score] ?? LOSERS_INDEX;
};

export const getWinners = (tickets, winningNumber) => {
  const winners = [0, 0, 0, 0, 0];

  tickets.forEach(ticket => {
    const rankIndex = getWinnerIndex(ticket, winningNumber);

    if (rankIndex === LOSERS_INDEX) return;

    winners[rankIndex] += 1;
  });

  return winners;
};

const getTotalProfit = winners => {
  let totalProfit = 0;

  for (const [idx, winnerAmount] of winners.entries()) {
    totalProfit += winnerAmount * PRIZE_AMOUNT[idx];
  }

  return totalProfit;
};

export const getProfitPercentage = (ticketAmount, winners) => {
  const payment = ticketAmount * TICKET_PRICE;
  return Math.floor(((getTotalProfit(winners) - payment) / payment) * 100);
};

export const getWinningNumbers = ({
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  bonus,
}) => {
  return {
    main: [first, second, third, fourth, fifth, sixth].map(({ value }) =>
      Number(value)
    ),
    bonus: Number(bonus.value),
  };
};
