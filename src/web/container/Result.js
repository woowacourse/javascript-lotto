import { calculateTotalPrize } from '../../domain/calculateTotalPrize';
import getLottoRank from '../../domain/getLottoRank';
import { calculateProfitRate } from '../../utils/calculateProfitRate';

const Result = {
  showResult(winningLotto, bonusLottoNumber, randomLottos, lottoMoney) {
    const resultWindowContainer = document.querySelector('.result-window');
    const ranks = getLottoRank({
      winningLotto,
      bonusLottoNumber,
      randomLottos,
    });
    resultWindowContainer.innerHTML = this.showResultWindow(ranks, lottoMoney);
    resultWindowContainer.classList.toggle('hidden');
    const resultCloseButton = document.querySelector('.button-close');
    resultCloseButton.addEventListener('click', () => {
      resultWindowContainer.innerHTML = '';
      resultWindowContainer.classList.toggle('hidden');
    });
    const restartButton = document.querySelector('.button-restart');
    restartButton.addEventListener('click', () => location.reload());
  },

  showResultWindow(ranks, lottoMoney) {
    const totalPrize = calculateTotalPrize(ranks);
    return `
    <div class="result-popup-container">
    <div class="result-popup">
    <div class="result-popup-close">
      <button class="button-close">Ⅹ</button>
    </div>
    <div class="result-popup-title">
      <h1>🏆 당첨 통계 🏆</h1>
    </div>
    <div id="result-winning-list">
      <table>
        <thead>
          <tr>
            <th>일치 갯수</th>
            <th>당첨금</th>
            <th>당첨 갯수</th>
          </tr>
        </thead>
        <tbody>
          ${this.showResultList(ranks)}
        </tbody>
      </table>
    </div>
    <div id="result-profit-rate">
      ${this.showProfitRate(totalPrize, lottoMoney)}
    </div>
    <button class="button-restart">다시 시작하기</button>
  </div>
</div>
</div>
    `;
  },

  showResultList(ranks) {
    return `<tr>
    <td>3개</td>
    <td>5,000</td>
    <td>${ranks[0]}개</td>
  </tr>
  <tr>
    <td>4개</td>
    <td>50,000</td>
    <td>${ranks[1]}개</td>
  </tr>
  <tr>
    <td>5개</td>
    <td>1,500,000</td>
    <td>${ranks[2]}개</td>
  </tr>
  <tr>
    <td>5개+보너스볼</td>
    <td>30,000,000</td>
    <td>${ranks[3]}개</td>
  </tr>
  <tr>
    <td>6개</td>
    <td>2,000,000,000</td>
    <td>${ranks[4]}개</td>
  </tr>
  `;
  },

  showProfitRate(totalPrize, lottoMoney) {
    return `
    당신의 총 수익률은 ${calculateProfitRate(
      totalPrize,
      lottoMoney.getLottoMoney(),
    )}%입니다.
    `;
  },
};

export default Result;
