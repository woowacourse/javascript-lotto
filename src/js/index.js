import { parsePrice } from '../input/parseInput.js';
import { purchaseLottos } from '../service/PurchaseService.js';
import validatePrice from '../validation/validatePrice.js';
import { $, $all } from '../util/selector.js';
import SYSTEM_MESSAGE from '../constants/systemMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#purchase-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const priceInput = document.getElementById('price');
    const errorMessage = document.querySelector('.error-message');

    const priceValue = priceInput.value.trim();

    // 초기화 (기존 에러 메시지 제거)
    errorMessage.textContent = '';
    errorMessage.style.visibility = 'hidden';
    priceInput.classList.remove('error');

    try {
      validatePrice(priceValue);
      const price = parsePrice(priceValue);
      const { lottoArray, lottoCount } = purchaseLottos(price);
      updateLottoUI(lottoArray, lottoCount);
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.style.visibility = 'visible';
      priceInput.classList.add('error');
    }
  });
});

// ✅ 기존 UI 초기화 함수
const clearLottoUI = () => {
  $('.purchase-result').innerHTML = '';
};

const updateLottoUI = (lottoArray, lottoCount) => {
  clearLottoUI();
  updateLottoCountUI(lottoCount);
  updateLottoListUI(lottoArray);
};

// 로또 구매 개수 UI 업데이트
const updateLottoCountUI = (lottoCount) => {
  const purchaseResult = $('.purchase-result');
  const lottoCountUI = document.createElement('p');
  lottoCountUI.classList.add('typo-15-R');
  lottoCountUI.textContent = SYSTEM_MESSAGE.COUNT(lottoCount);

  purchaseResult.appendChild(lottoCountUI);
};

// 로또 리스트 UI 업데이트
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
  numbersSpan.classList.add('typo-15-R', 'lotto-numbers');
  numbersSpan.textContent = lotto.toString();

  listItem.appendChild(ticketIcon);
  listItem.appendChild(numbersSpan);
  return listItem;
};
