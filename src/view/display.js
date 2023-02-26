import {
  purchasedLottoLabel,
  lottoTicketContainer,
  winningNumberForm,
  winningNumberOne,
  modal,
  rateOfReturn,
  fifthWin,
  fourthWin,
  thirdWin,
  secondhWin,
  firstWin,
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
    winningNumberOne.focus();
  },

  showModal(lottoResultChart) {
    modal.classList.remove('v-hidden');
    fifthWin.innerHTML = lottoResultChart[NUMBER.FIFTH];
    fourthWin.innerHTML = lottoResultChart[NUMBER.FOURTH];
    thirdWin.innerHTML = lottoResultChart[NUMBER.THIRD];
    secondhWin.innerHTML = lottoResultChart[NUMBER.SECOND];
    firstWin.innerHTML = lottoResultChart[NUMBER.FIRST];
  },

  showProfitRate(profitRate) {
    rateOfReturn.innerHTML = `당신의 총 수익률은 ${profitRate}%입니다.`;
  },

  validateAlert() {
    alert('구매 금액을 다시 입력해주세요.');
  },
};
