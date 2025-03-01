import { $ } from '../../util/selector.js';

export const showLottoTickets = (lottoArray) => {
  const purchaseResult = $('.purchase-result');

  const lottoList = document.createElement('ul');
  lottoList.classList.add('lotto-list');

  const fragment = document.createDocumentFragment();

  lottoArray.forEach((lotto) => {
    fragment.appendChild(createLottoListItem(lotto));
  });

  lottoList.appendChild(fragment);
  purchaseResult.appendChild(lottoList);
};

// 개별 로또 아이템 생성
const createLottoListItem = (lotto) => {
  const listItem = document.createElement('li');

  const ticketIcon = document.createElement('img');
  ticketIcon.src = 'ticket.png';
  ticketIcon.alt = '로또 티켓';
  ticketIcon.classList.add('lotto-icon');

  const numbersSpan = document.createElement('span');
  numbersSpan.classList.add('lotto-numbers');
  numbersSpan.textContent = lotto.toString();

  listItem.appendChild(ticketIcon);
  listItem.appendChild(numbersSpan);
  return listItem;
};
