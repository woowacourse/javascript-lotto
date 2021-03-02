import { LOTTO_NUMBER_SEPARATOR } from '../constants/display.js';

export const getLottoTicketHTML = (lottoTicket) => {
  return `
  <li class="mx-1 text-4xl d-flex items-center">
    🎟️
    <span class="lotto-numbers text-xl ml-5 d-none">${lottoTicket.numbers.join(LOTTO_NUMBER_SEPARATOR)}</span>
  </li>`;
};
