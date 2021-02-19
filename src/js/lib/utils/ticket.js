import createRandomNumber from './random.js';
import {
  TICKET_NUMBERS_LENGTH,
  TICKET_PRICE,
  TICKET_MIN_NUMBER,
  TICKET_MAX_NUMBER,
} from '../constants/ticket.js';

export const createTicket = () => {
  const ticket = new Set();

  while (ticket.size < TICKET_NUMBERS_LENGTH) {
    ticket.add(createRandomNumber(TICKET_MIN_NUMBER, TICKET_MAX_NUMBER));
  }

  return [...ticket];
};

export const getNumberOfTickets = value =>
  Math.floor(Number(value) / TICKET_PRICE);
