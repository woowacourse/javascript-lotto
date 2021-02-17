import createRandomNumber from './random.js';

const TICKET_NUMBERS_LENGTH = 6;
const MIN = 1;
const MAX = 45;

export const createTicket = () =>
  [...Array(TICKET_NUMBERS_LENGTH)].map(() => createRandomNumber(MIN, MAX));
