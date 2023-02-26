import {
  purchasedLottoLabel,
  lottoTicketContainer,
  winningNumberForm,
  modal,
  resultTableBody,
  rateOfReturn,
} from '../utils/DOM.js';
import { NUMBER } from '../utils/constant.js';

export const display = {
  showBuyLottoCount(lottoCount) {
    purchasedLottoLabel.innerHTML = `총 ${lottoCount}개를 구매하였습니다.`;
  },

  showlottoNumbers(numbers) {
    lottoTicketContainer.innerHTML += `<li class="mx-1 text-4xl d-flex items-center">
    🎟️
    <span class="lotto-numbers text-xl ml-5">${numbers.join(', ')}</span>
  </li>`;
  },

  showWinningNumberForm() {
    winningNumberForm.classList.remove('d-none');
    winningNumberForm[NUMBER.FIRST_INPUT].focus();
  },

  showModal(lottoResultChart) {
    modal.classList.remove('v-hidden');
    resultTableBody.innerHTML = `<tr class="text-center">
    <td class="p-3">3개</td>
    <td class="p-3">5,000</td>
    <td class="p-3">${lottoResultChart[NUMBER.FIFTH]}</td>
  </tr>
  <tr class="text-center">
    <td class="p-3">4개</td>
    <td class="p-3">50,000</td>
    <td class="p-3">${lottoResultChart[NUMBER.FOURTH]}</td>
  </tr>
  <tr class="text-center">
    <td class="p-3">5개</td>
    <td class="p-3">1,500,000</td>
    <td class="p-3">${lottoResultChart[NUMBER.THIRD]}</td>
  </tr>
  <tr class="text-center">
    <td class="p-3">5개 + 보너스볼</td>
    <td class="p-3">30,000,000</td>
    <td class="p-3">${lottoResultChart[NUMBER.SECOND]}</td>
  </tr>
  <tr class="text-center">
    <td class="p-3">6개</td>
    <td class="p-3">2,000,000,000</td>
    <td class="p-3">${lottoResultChart[NUMBER.FIRST]}</td>
  </tr>`;
  },

  showProfitRate(profitRate) {
    rateOfReturn.innerHTML = `당신의 총 수익률은 ${profitRate}%입니다.`;
  },

  validateAlert() {
    alert('구매 금액을 다시 입력해주세요.');
  },
};
