import createRandomNumber from './random.js';

const TICKET_PRICE = 1000;
const TICKET_NUMBERS_LENGTH = 6;
export const MIN = 1;
export const MAX = 45;

export const createTicket = () =>
  [...Array(TICKET_NUMBERS_LENGTH)].map(() => createRandomNumber(MIN, MAX));

export const getNumberOfTickets = value =>
  Math.floor(Number(value) / TICKET_PRICE);
