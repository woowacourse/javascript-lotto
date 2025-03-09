import SYSTEM_MESSAGE from '../../constants/systemMessage.js';
import { $ } from '../../util/web/selector.js';

const showLottoCount = (lottoCount) => {
  const purchaseResult = $('.purchase-form__result');
  const lottoCountUI = document.createElement('p');
  lottoCountUI.textContent = SYSTEM_MESSAGE.COUNT(lottoCount);

  purchaseResult.appendChild(lottoCountUI);
};

const showLottoTickets = (lottoArray) => {
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

export const updatePurchaseView = (lottoCount, lottoArray) => {
  showLottoCount(lottoCount);
  showLottoTickets(lottoArray);
};

export const showWinningNumberForm = (isValid) => {
  const winningNumberForm = $('.winning-form');
  winningNumberForm.style.display = isValid ? 'block' : 'none';
};

export const updateMatchingResult = (matchingResult, profitRate) => {
  $('#match-3').textContent = `${matchingResult[3]}개`;
  $('#match-4').textContent = `${matchingResult[4]}개`;
  $('#match-5').textContent = `${matchingResult[5]}개`;
  $('#match-bonus').textContent = `${matchingResult['bonus']}개`;
  $('#match-6').textContent = `${matchingResult[6]}개`;

  const profitRateText = `당신의 총 수익률은 ${profitRate}%입니다.`;
  $('#profit-rate').textContent = profitRateText;
};
