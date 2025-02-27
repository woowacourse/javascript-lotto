import createDomElement from '../../../../../utils/createDomElement.js';

const $ticketIcon = () => {
  const ticketIcon = createDomElement('i', {
    textContent: '🎟️',
  });

  return ticketIcon;
};

export default $ticketIcon;
