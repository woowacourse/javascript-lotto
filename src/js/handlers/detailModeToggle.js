import { $ } from '../lib/utils/dom.js';

const onDetailMode = ticketList => {
  ticketList.classList.add('detail-mode');
  ticketList.classList.remove('d-flex');
};

const offDetailMode = ticketList => {
  ticketList.classList.remove('detail-mode');
  ticketList.classList.add('d-flex');
};

const detailModeToggleHandler = event => {
  const ticketList = $('#ticket-list');

  if (event.target.checked) {
    onDetailMode(ticketList);
  } else {
    offDetailMode(ticketList);
  }
};

export default detailModeToggleHandler;
