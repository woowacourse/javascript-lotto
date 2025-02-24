/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { getUIInput } from './service/InputService.js';
import makeLotto from './service/LottoService.js';
import { getPurchasePrice } from './service/ParsingService.js';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('purchase-button');
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      const { purchaseAmount } = await getPurchasePrice(getUIInput);
      const purchaseResult = document.createElement('div');
      purchaseResult.classList.add('purchase-result');
      purchaseResult.textContent = `총 ${purchaseAmount}개를 구매하였습니다.`;
      document.querySelector('.lotto-container').appendChild(purchaseResult);

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

        document.querySelector('.lotto-container').appendChild(lottoWrapper);
      });
    } catch (error) {
      console.log(error);
      console.error('Error:', error.message);
    }
  });
});
