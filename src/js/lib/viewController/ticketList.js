import { createTicketTemplate } from './teamplates/ticket.js';
import { $ } from '../utils/dom.js';

const updateTicketListView = tickets => {
  const ticketsTemplate = tickets.reduce(
    (acc, ticket) => acc + createTicketTemplate(ticket),
    ''
  );

  $('#ticket-list').innerHTML = ticketsTemplate;
  $('#ticket-count').innerHTML = `총 ${tickets.length}개를 구매하였습니다.`;
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
