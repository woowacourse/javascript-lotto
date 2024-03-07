import { calculateTotalPrize } from '../../domain/calculateTotalPrize';
import getLottoRank from '../../domain/getLottoRank';
import { calculateProfitRate } from '../../utils/calculateProfitRate';
import { RESULT } from '../constants/Constants';

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
      <h1>${RESULT.title}</h1>
    </div>
    <div id="result-winning-list">
      <table>
        <thead>
          <tr>
            <th>${RESULT.matchNumber}</th>
            <th>${RESULT.prize}</th>
            <th>${RESULT.winCount}</th>
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
    <button class="button-restart">${RESULT.restart}</button>
  </div>
</div>
</div>
    `;
  },

  showResultList(ranks) {
    return `<tr>
    <td>${RESULT.fifth[0]}</td>
    <td>${RESULT.fifth[1]}</td>
    <td>${ranks[0]}개</td>
  </tr>
  <tr>
    <td>${RESULT.fourth[0]}</td>
    <td>${RESULT.fourth[1]}</td>
    <td>${ranks[1]}개</td>
  </tr>
  <tr>
    <td>${RESULT.third[0]}</td>
    <td>${RESULT.third[1]}</td>
    <td>${ranks[2]}개</td>
  </tr>
  <tr>
    <td>${RESULT.second[0]}</td>
    <td>${RESULT.second[1]}</td>
    <td>${ranks[3]}개</td>
  </tr>
  <tr>
    <td>${RESULT.first[0]}</td>
    <td>${RESULT.first[1]}</td>
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
