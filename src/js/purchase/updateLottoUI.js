import SYSTEM_MESSAGE from '../../constants/systemMessage.js';
import { $ } from '../../util/selector.js';

export const updateLottoUI = (lottoArray, lottoCount) => {
  updateLottoCountUI(lottoCount);
  updateLottoListUI(lottoArray);
};

const updateLottoCountUI = (lottoCount) => {
  const purchaseResult = $('.purchase-result');
  const lottoCountUI = document.createElement('p');
  lottoCountUI.textContent = SYSTEM_MESSAGE.COUNT(lottoCount);

  purchaseResult.appendChild(lottoCountUI);
};

const updateLottoListUI = (lottoArray) => {
  const purchaseResult = $('.purchase-result');

  const lottoList = document.createElement('ul');
  lottoList.classList.add('lotto-list');
  purchaseResult.appendChild(lottoList);

  lottoArray.forEach((lotto) => {
    const listItem = createLottoListItem(lotto);
    lottoList.appendChild(listItem);
  });
};

// 개별 로또 아이템 생성
const createLottoListItem = (lotto) => {
  const listItem = document.createElement('li');

  // 🎟️ 로또 티켓 이미지
  const ticketIcon = document.createElement('img');
  ticketIcon.src = 'public/ticket.png';
  ticketIcon.alt = '로또 티켓';
  ticketIcon.classList.add('lotto-icon');

  // 로또 번호
  const numbersSpan = document.createElement('span');
  numbersSpan.classList.add('typo-body', 'lotto-numbers');
  numbersSpan.textContent = lotto.toString();

  listItem.appendChild(ticketIcon);
  listItem.appendChild(numbersSpan);
  return listItem;
};
