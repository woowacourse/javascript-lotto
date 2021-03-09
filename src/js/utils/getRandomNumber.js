import { VALUE } from '../utils/constant.js';

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateTicketNumbers = () => {
  const ticketNumbers = new Set();

  while (ticketNumbers.size < VALUE.LOTTO.TICKET_LENGH) {
    ticketNumbers.add(
      getRandomNumber(VALUE.LOTTO.MIN_NUM, VALUE.LOTTO.MAX_NUM),
    );
  }

  return [...ticketNumbers].sort((a, b) => a - b);
};
