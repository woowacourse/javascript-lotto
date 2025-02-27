import createDomElement from '../../../../utils/createDomElement.js';
import $ticketIcon from './ticketIcon/ticketIcon.js';
import $ticketText from './ticketText/ticketText.js';

const $ticket = (numbers) => {
  const ticket = createDomElement('div', {
    className: 'ticket',
  });

  ticket.appendChild($ticketIcon());
  ticket.appendChild($ticketText(numbers));

  return ticket;
};

export default $ticket;
