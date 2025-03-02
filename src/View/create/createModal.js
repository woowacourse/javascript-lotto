import { PRIZE_MONEY } from '../../constants/MagicNumber';

function createModal(winCount, revenueRate) {
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
            <div class="revenue-rate">당신의 총 수익률은 ${revenueRate.toFixed(
              1,
            )}%입니다.</div>
            <button id="retry-button">다시 시작하기</button>
          </div>`;

  document.querySelector('.container').appendChild(modal);
  return modal;
}

export default createModal;
