import { $ } from '../../util/selector.js';

export const showLottoTickets = (lottoArray) => {
  const purchaseResult = $('.purchase-form__result');

  const lottoList = document.createElement('ul');
  lottoList.classList.add('purchase-form__list');

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
  listItem.classList.add('purchase-form__item');

  const ticketIcon = document.createElement('img');
  ticketIcon.src = 'ticket.png';
  ticketIcon.alt = '로또 티켓';
  ticketIcon.classList.add('purchase-form__icon');

  const numbersSpan = document.createElement('span');
  numbersSpan.classList.add('lotto-numbers', 'typo-body');
  numbersSpan.textContent = lotto.toString();

  listItem.appendChild(ticketIcon);
  listItem.appendChild(numbersSpan);
  return listItem;
};
