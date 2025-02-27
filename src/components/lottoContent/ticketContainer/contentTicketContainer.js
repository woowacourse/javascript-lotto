import createDomElement from '../../../utils/createDomElement.js';
import $ticket from './ticket/ticket.js';

const $ticketContainer = (lottos) => {
  const ticketContainer = createDomElement('div', {
    className: 'ticket_container',
  });

  lottos.forEach((lotto) =>
    ticketContainer.appendChild($ticket(lotto.getNumbers())),
  );

  return ticketContainer;
};

export default $ticketContainer;
