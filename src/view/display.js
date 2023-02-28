import {
  $,
  purchasedLottoLabel,
  lottoTicketContainer,
  winningNumberForm,
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
    $('.winning-number-inputs').innerHTML = display.winningNumberInput();
    $('.bonus-input').innerHTML = display.bonusNumberInput();
    $('.order-0').focus();
  },

  showModal(lottoResultChart) {
    modal.classList.remove('v-hidden');
    fifthWin.innerHTML = lottoResultChart[NUMBER.FIFTH];
    fourthWin.innerHTML = lottoResultChart[NUMBER.FOURTH];
    thirdWin.innerHTML = lottoResultChart[NUMBER.THIRD];
    secondhWin.innerHTML = lottoResultChart[NUMBER.SECOND];
    firstWin.innerHTML = lottoResultChart[NUMBER.FIRST];
  },

  winningNumberInput() {
    let winningNumberInputDisplay = '';

    for (let index = 0; index < NUMBER.LOTTO_NUMBER_LENGTH; index++) {
      winningNumberInputDisplay += `
      <input type = "number"
      min = "${NUMBER.LOTTO_NUMBER_START_ONE}"
      max = "${NUMBER.LOTTO_NUMBER_RANGE}"
      class = "winning-number mx-1 text-center order-${index}"
      required/>
      `;
    }
    return winningNumberInputDisplay;
  },

  bonusNumberInput() {
    let bonusNumberInputDisplay = '';

    bonusNumberInputDisplay += `
    <input type="number"
    min=${NUMBER.LOTTO_NUMBER_START_ONE}
    max=${NUMBER.LOTTO_NUMBER_RANGE}
    class="bonus-number text-center"
    required/>
    `;

    return bonusNumberInputDisplay;
  },

  showProfitRate(profitRate) {
    rateOfReturn.innerHTML = `당신의 총 수익률은 ${profitRate}%입니다.`;
  },

  validateAlert() {
    alert('구매 금액을 다시 입력해주세요.');
  },
};
