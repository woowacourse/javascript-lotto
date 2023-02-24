import { createDomWith, appendDomByList, $ } from './domUtils.js';

const makeTicketDom = (lotto) => {
  const $ticket = createDomWith('div')({ className: 'ticket' });
  const $ticketEmoji = document.createElement('span');
  $ticketEmoji.innerText = '🎟️';

  const $ticketNumbers = document.createElement('span');
  $ticketNumbers.innerText = `${[...lotto].join(', ')}`;

  $ticket.append($ticketEmoji, $ticketNumbers);

  return $ticket;
};

const getTicketCount = (lottoList) => {
  const ticketMessage = document.createElement('p');
  ticketMessage.textContent = `총 ${lottoList.length}개를 구매하였습니다.`;

  return ticketMessage;
};

export const renderLottoList = (lottoList) => {
  const $ticketSection = createDomWith('section')({ id: 'lotto-issued' });
  const $ticketMessage = getTicketCount(lottoList);

  const $ticketContainer = createDomWith('div')({ id: 'ticket-list' });

  appendDomByList($ticketContainer)(lottoList)(makeTicketDom);
  $ticketSection.append($ticketMessage, $ticketContainer);

  $('.app-box').appendChild($ticketSection);
};
