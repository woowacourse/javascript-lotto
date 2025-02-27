import createDomElement from '../../../../../utils/createDomElement.js';

const $ticketText = (numbers) => {
  const ticketText = createDomElement('span', {
    textContent: numbers,
  });

  return ticketText;
};

export default $ticketText;
