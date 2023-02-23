import LottoGame from './domain/LottoGame.js';
const lottoGame = new LottoGame();

// utils
const $ = (query) => document.querySelector(query);

const all$ = (query) => document.querySelectorAll(query);

const setDomAttributes = ($element) => (options) => {
  Object.assign($element, options);
  return $element;
};

const createDomWith = (tag) => (options) => setDomAttributes(document.createElement(tag))(options);

const appendDomByList = ($parent) => (children) => (handler) => {
  $parent.append(...children.map(handler));
};

const appendBySequence = (...domList) => {
  if (!domList || domList.length <= 1) return;
  domList.forEach((element, index) => {
    if (index === domList.length - 1) return;
    domList[index + 1].appendChild(element);
  });
};

// main

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

const renderLottoList = (lottoList) => {
  const $ticketSection = createDomWith('section')({ id: 'lotto-issued' });
  const $ticketMessage = getTicketCount(lottoList);

  const $ticketContainer = createDomWith('div')({ id: 'ticket-list' });

  appendDomByList($ticketContainer)(lottoList)(makeTicketDom);
  $ticketSection.append($ticketMessage, $ticketContainer);

  appendBySequence($ticketSection, $('.app-box'));
};

// const renderWinningForm = () => {

// };

// purchasingButton
const purchasingButton = $('#purchasing-button');
const purchasingHandler = (event) => {
  event.preventDefault();
  try {
    const money = Number($('#money').value);
    const lottoList = lottoGame.setLottos(money).getLottos();
    renderLottoList(lottoList);
    purchasingButton.disabled = 'disabled';
  } catch (error) {
    console.dir(error);
  }
};
purchasingButton.addEventListener('click', purchasingHandler);
