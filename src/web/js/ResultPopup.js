import { RANK } from '../../constants';
import { $ } from './utils/dom';

class ResultPopup {
  constructor({ handleRestart }) {
    this.handleRestart = handleRestart;
  }

  renderPopup(matchingResult, totalProfit) {
    $('.popup').innerHTML = this.generatePopupTemplate(matchingResult, totalProfit);
    this.openPopup();

    $('.popup-close').addEventListener('click', this.closePopup.bind(this));
    $('.restart-btn').addEventListener('click', this.handleRestart);
  }

  openPopup() {
    $('.popup').style.display = 'block';
    $('.popup-open-back').style.display = 'block';
  }

  closePopup() {
    $('.popup').style.display = 'none';
    $('.popup-open-back').style.display = 'none';
  }

  generatePopupTemplate(matchingResult, totalProfit) {
    return String.raw`
      <button class="popup-close">X</button>
      <h2 class="result">🏆 당첨 통계 🏆</h2>
      <div class="rank-container">${this.generateRankColumns(matchingResult)}</div>
      <div class="total-profit">당신의 총 수익률은 ${totalProfit}%입니다.</div>
      <button class="restart-btn">다시 시작하기</button>
    `;
  }

  generateRankColumns(matchingResult) {
    return `<div class="rank-column">
        <div>일치 갯수</div>
        <div>당첨금</div>
        <div>당첨 갯수</div>
        </div>${Object.keys(matchingResult)
          .reverse()
          .map((rank) => this.generateResultColumn(rank, matchingResult))
          .join('')}`;
  }

  generateResultColumn(rank, matchingResult) {
    return `
      <div class="rank-column">
        <span>${RANK[rank].DESC}</span>
        <span>${RANK[rank].PRIZE.toLocaleString('ko-KR')}</span>
        <span>${matchingResult[rank]}개</span>
      </div>
    `;
  }
}

export default ResultPopup;
