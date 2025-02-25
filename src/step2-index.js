/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import {
  getUIPurchasePrice,
  getUIWinningNumber,
} from './service/InputService.js';
import makeLotto from './service/LottoService.js';
import {
  getPurchasePrice,
  getWinningNumber,
} from './service/ParsingService.js';

document.addEventListener('DOMContentLoaded', () => {
  const purchaseButton = document.getElementById('purchase-button');
  purchaseButton.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      const { purchaseAmount } = await getPurchasePrice(getUIPurchasePrice);
      const purchaseResult = document.createElement('div');
      purchaseResult.classList.add('purchase-result');
      purchaseResult.textContent = `총 ${purchaseAmount}개를 구매하였습니다.`;
      document.querySelector('.purchase-message').appendChild(purchaseResult);

      const lottos = makeLotto(purchaseAmount);
      lottos.forEach((lotto) => {
        const lottoWrapper = document.createElement('div');
        lottoWrapper.classList.add('lotto-wrapper');

        const lottoTicket = document.createElement('div');
        lottoTicket.classList.add('lotto-ticket');
        lottoTicket.textContent = '🎟️';

        const lottoNumbers = document.createElement('div');
        lottoNumbers.classList.add('lotto-numbers');
        lottoNumbers.textContent = `${lotto.numbers.join(', ')}`;

        lottoWrapper.appendChild(lottoTicket);
        lottoWrapper.appendChild(lottoNumbers);

        document.querySelector('.lotto-content').appendChild(lottoWrapper);
        purchaseButton.disabled = true;
      });
    } catch (error) {
      //todo: 에러 발생시 에러 메시지 띄우기
      console.log(error);
      console.error('Error:', error.message);
    }
  });
  const resultButton = document.getElementById('check-result-btn');
  resultButton.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      const winningNumber = await getWinningNumber(getUIWinningNumber);
      console.log(winningNumber);
    } catch (error) {
      console.log(error);
    }
  });
});
