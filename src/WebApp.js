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

const renderWinningForm = () => {
  // section
  const $winningSection = createDomWith('section')({ id: 'winning-lotto' });

  // p
  const $message = createDomWith('p')({
    class: 'message',
    innerText: '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.',
  });

  // form
  const $form = document.createElement('form');
  // div
  const $spanContainer = createDomWith('div')({ id: 'number-message', class: 'message' });

  // span
  const $winningSpan = createDomWith('span')({ innerText: '당첨 번호' });
  const $bonusSpan = createDomWith('span')({ innerText: '보너스 번호' });
  $spanContainer.append($winningSpan, $bonusSpan);

  // div
  const $lottoContainer = createDomWith('div')({ id: 'number-box' });

  // div
  const $lottoWinningContainer = createDomWith('div')({ id: 'winning-numbers' });

  // inputS
  appendDomByList($lottoWinningContainer)(Array.from({ length: 6 }))((elem) => {
    return createDomWith('input')({ type: 'text', minlength: '1', maxlength: '2' });
  });

  // div
  const $lottoBonusContainer = createDomWith('div')({ id: 'bonus-number' });

  // input
  const $bonusInput = createDomWith('input')({ type: 'text' });
  $lottoBonusContainer.appendChild($bonusInput);

  // submitButton
  const $submitButton = createDomWith('button')({
    id: 'result-button',
    type: 'submit',
    innerText: '결과 확인하기',
  });

  $lottoContainer.append($lottoWinningContainer, $lottoBonusContainer);
  $form.append($spanContainer, $lottoContainer, $submitButton);
  $winningSection.append($message, $form);
  $('.app-box').append($winningSection);
};

// purchasingButton
const purchasingButton = $('#purchasing-button');
const purchasingHandler = (event) => {
  event.preventDefault();
  try {
    const money = Number($('#money').value);
    const lottoList = lottoGame.setLottos(money).getLottos();
    renderLottoList(lottoList);
    renderWinningForm();
    purchasingButton.disabled = 'disabled';
  } catch (error) {
    console.dir(error);
  }
};
purchasingButton.addEventListener('click', purchasingHandler);
