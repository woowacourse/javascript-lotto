/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { getUIInput } from './service/InputService.js';
import { getPurchasePrice } from './service/ParsingService.js';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('purchase-button');
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      const { purchaseAmount } = await getPurchasePrice(getUIInput);
      const result = document.createElement('div');
      result.classList.add('purchase-result');
      result.textContent = `${purchaseAmount}개를 구매하였습니다.`;
      document.querySelector('.input-container').appendChild(result);
    } catch (error) {
      console.error('Error:', error.message);
    }
  });
});
