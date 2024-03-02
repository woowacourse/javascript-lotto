import LottoMatcher from '../../domain/LottoMatcher';
import LottoCalculator from '../../domain/LottoCalculator';
import WinningNumberValidator from '../../validators/WinningNumberValidator';
import BonusNumberValidator from '../../validators/BonusNumberValidator';
import { RANK } from '../../constants';
import { $, $$ } from './utils/dom';

class ResultPopup {
  constructor(lottoTicketArray) {
    this.lottoTicketArray = lottoTicketArray;
    $('.winning-bonus-number-form').addEventListener('submit', this.handleWinningInputForm.bind(this));
  }

  init() {
    $$('.winning-number').forEach((element) => {
      element.value = '';
    });
    $('.bonus-number').value = '';
  }

  handleWinningInputForm(event) {
    event.preventDefault();

    const winningNumbers = Array.from($$('.winning-number')).map((input) => Number(input.value));
    const bonusNumber = Number($('.bonus-number').value);

    this.handleErrorAndProcessInput(winningNumbers, bonusNumber);
  }

  handleErrorAndProcessInput(winningNumbers, bonusNumber) {
    try {
      this.validateWinningBonus(winningNumbers, bonusNumber);
      const { lottoMatcher, totalProfit } = this.processWinningInput(winningNumbers, bonusNumber);
      this.renderPopup(lottoMatcher.matchingResult, totalProfit);
    } catch (error) {
      alert(error.message);
      this.init();
    }
  }

  validateWinningBonus(winningNumbers, bonusNumber) {
    WinningNumberValidator.validate(winningNumbers);
    BonusNumberValidator.validate(bonusNumber, winningNumbers);
  }

  processWinningInput(winningNumbers, bonusNumber) {
    const lottoMatcher = new LottoMatcher(winningNumbers, bonusNumber);
    this.lottoTicketArray.forEach((lotto) => lottoMatcher.processMatches(lotto));

    const totalProfit = LottoCalculator.getRateOfReturn(
      this.lottoTicketArray.length * 1000,
      lottoMatcher.matchingResult,
    );
    return { lottoMatcher, totalProfit };
  }

  renderPopup(matchingResult, totalProfit) {
    $('.popup').innerHTML = this.generatePopupTemplate(matchingResult, totalProfit);
    this.openPopup();

    $('.popup-close').addEventListener('click', this.closePopup.bind(this));
    $('.restart-btn').addEventListener('click', this.restart.bind(this));
  }

  openPopup() {
    $('.popup').style.display = 'block';
    $('.popup-open-back').style.display = 'block';
  }

  closePopup() {
    $('.popup').style.display = 'none';
    $('.popup-open-back').style.display = 'none';
  }

  restart() {
    this.closePopup();
    // location.reload();
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
