import createRandomNumber from './random.js';
import {
  TICKET_NUMBERS_LENGTH,
  TICKET_PRICE,
  TICKET_MIN_NUMBER,
  TICKET_MAX_NUMBER,
  PRIZE_AMOUNT,
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

export const getRank = (ticket, winningNumber) => {
  let score = 0;

  ticket.forEach(number => {
    if (winningNumber.main.includes(number)) {
      score += 1;
    }
  });

  if (score === 5 && ticket.includes(winningNumber.bonus)) {
    return 'second';
  }

  if (score < 3) {
    return 'loser';
  }

  return ['fifth', 'fourth', 'third', 'first'][score - 3];
};

export const getWinners = (tickets, winningNumber) => {
  const winners = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  tickets.forEach(ticket => {
    const rank = getRank(ticket, winningNumber);

    if (rank !== 'loser') {
      winners[rank] += 1;
    }
  });

  return winners;
};

const getTotalProfit = winners => {
  let totalProfit = 0;

  for (const winner in winners) {
    if (Object.hasOwnProperty.call(winners, winner)) {
      totalProfit += winners[winner] * PRIZE_AMOUNT[winner];
    }
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
