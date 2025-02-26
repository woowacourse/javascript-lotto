/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { PRIZE_MONEY } from './constants/MagicNumber.js';
import createLottoInput from './createLottoInput.js';
import {
  calculatePrize,
  calculateRevenueRate,
  calculateWins,
} from './service/CalculatorService.js';
import {
  getUIBonusNumber,
  getUIPurchasePrice,
  getUIWinningNumber,
} from './service/InputService.js';
import makeLotto from './service/LottoService.js';
import {
  getBonusNumber,
  getPurchasePrice,
  getWinningNumber,
} from './service/ParsingService.js';

document.addEventListener('DOMContentLoaded', () => {
  const purchaseButton = document.getElementById('purchase-button');
  let lottos = [];
  purchaseButton.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      const { purchasePrice, purchaseAmount } = await getPurchasePrice(
        getUIPurchasePrice,
      );
      const purchaseResult = document.createElement('div');
      purchaseResult.classList.add('purchase-result');
      purchaseResult.textContent = `총 ${purchaseAmount}개를 구매하였습니다.`;
      document.querySelector('.purchase-message').appendChild(purchaseResult);

      lottos = makeLotto(purchaseAmount);
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

      const lottoInput = createLottoInput();

      document.querySelector('.card-content').appendChild(lottoInput);
      const resultButton = document.getElementById('check-result-btn');

      resultButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const userLotto = await getWinningNumber(getUIWinningNumber);
        const parsedLotto = await getBonusNumber(userLotto, getUIBonusNumber);

        const winCount = calculateWins(lottos, parsedLotto);
        const total = calculatePrize(winCount, PRIZE_MONEY);
        const revenueRate = calculateRevenueRate(total, purchasePrice);
        resultButton.disabled = true;

        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');
        modalOverlay.style.display = 'block';

        document.querySelector('.container').appendChild(modalOverlay);

        const modal = document.createElement('dialog');
        modal.classList.add('prize-result');
        modal.innerHTML = `
     
        <div class="result-header">
              <div class="close-button-wrapper">
                <button id="close-button">
                  ✕
                </button>
              </div>
              <div class="result-title">🏆 당첨 통계 🏆</div>
          </div>
          <div class="result-body">
              <table>
                <thead>
                  <tr>
                    <th scope="col">일치 갯수</th>
                    <th scope="col">당첨금</th>
                    <th scope="col">당첨 갯수</th>
                  </tr>
                </thead>
                <tbody class="table-body">
                  <tr class='win-result'>
                    <th scope="col">3개</th>
                    <th scope="col">${PRIZE_MONEY.THREE_MATCH.toLocaleString()}</th>
                    <th scope="col">${winCount.THREE_MATCH}개</th>
                  </tr>
                  <tr class='win-result'>
                    <th scope="col">4개</th>
                    <th scope="col">${PRIZE_MONEY.FOUR_MATCH.toLocaleString()}</th>
                    <th scope="col">${winCount.FOUR_MATCH}개</th>
                  </tr>
                  <tr class='win-result'>
                    <th scope="col">5개</th>
                    <th scope="col">${PRIZE_MONEY.FIVE_MATCH.toLocaleString()}</th>
                    <th scope="col">${winCount.FIVE_MATCH}개</th>
                  </tr>
                  <tr class='win-result'>
                    <th scope="col">5개+보너스볼</th>
                    <th scope="col">${PRIZE_MONEY.FIVE_MATCH_WITH_BONUS.toLocaleString()}</th>
                    <th scope="col">${winCount.FIVE_MATCH_WITH_BONUS}개</th>
                  </tr>
                  <tr class='win-result'>
                    <th scope="col">6개</th>
                    <th scope="col">${PRIZE_MONEY.SIX_MATCH.toLocaleString()}</th>
                    <th scope="col">${winCount.SIX_MATCH}개</th>
                  </tr>
                </tbody>
              </table>
          </div>
          <div class="result-footer">
            <div class="revenue-rate">당신의 총 수익률은 ${revenueRate}%입니다.</div>
            <button class="retry-button">다시 시작하기</button>
          </div>`;

        document.querySelector('.container').appendChild(modal);
        const closeButton = document.getElementById('close-button');
        closeButton.addEventListener('click', () => {
          event.preventDefault();
          document.querySelector('#purchase-price').value = '';
          document.querySelector('.lotto-container').innerHTML = '';
          lottoInput.innerHTML = '';
          modal.innerHTML = '';
          modal.style.display = 'none';
          modalOverlay.style.display = 'none';
        });
      });
    } catch (error) {
      //todo: 에러 발생시 에러 메시지 띄우기
      console.log(error);
      console.error('Error:', error.message);
    }
  });
});
