import createRandomNumber from './random.js';
import {
  TICKET_NUMBERS_LENGTH,
  TICKET_PRICE,
  TICKET_MIN_NUMBER,
  TICKET_MAX_NUMBER,
} from '../constants/ticket.js';

export const createTicket = () =>
  [...Array(TICKET_NUMBERS_LENGTH)].map(() =>
    createRandomNumber(TICKET_MIN_NUMBER, TICKET_MAX_NUMBER)
  );

export const getNumberOfTickets = value =>
  Math.floor(Number(value) / TICKET_PRICE);
