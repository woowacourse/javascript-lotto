import { createTicketTemplate } from './teamplates/ticket.js';
import { $ } from '../utils/dom.js';
import { lotto } from '../state/lotto.js';

const updateTicketListView = () => {
  const ticketsTemplate = lotto.tickets.reduce(
    (acc, ticket) => acc + createTicketTemplate(ticket),
    ''
  );

  $('#ticket-list').innerHTML = ticketsTemplate;
  $(
    '#ticket-count'
  ).innerHTML = `총 ${lotto.tickets.length}개를 구매하였습니다.`;
  $('#toggle-detail-mode').classList.remove('hide');
};

const turnDetailModeOn = () => {
  const $ticketList = $('#ticket-list');
  $ticketList.classList.add('detail-mode');
  $ticketList.classList.remove('d-flex');
};

const turnDetailModeOff = () => {
  const $ticketList = $('#ticket-list');
  $ticketList.classList.remove('detail-mode');
  $ticketList.classList.add('d-flex');
};

export { turnDetailModeOff, turnDetailModeOn, updateTicketListView };
