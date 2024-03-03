import { OUTPUT_MESSAGE } from '../../constants/message';
import WINNER from '../../constants/winner';
import { $, $$ } from '../../util/domSelector';
import { hideElement, renderElement } from '../../util/view';

const LottoResultModalView = {
  renderSection() {
    renderElement($('#winning-statistics-modal'));
  },

  hideSection() {
    hideElement($('#winning-statistics-modal'));
  },

  renderWinResultTable(winResults) {
    const innerHTML = winResults.map((_, index) => {
      const rankIndex = Math.abs(Object.keys(WINNER).length - index);
      return this.formatTableHTML(winResults, rankIndex);
    });
    $('#winning-statistics-table').insertAdjacentHTML('beforeend', innerHTML.join(''));
  },

  renderReturnOfRatio(rateOfRevenue) {
    $('#lotto-return-ratio').innerText = `당신의 총 수익률은 ${rateOfRevenue}%입니다.`;
  },

  formatTableHTML(winResults, rankIndex) {
    return `
    <tr class="win-results">
    <td>${OUTPUT_MESSAGE.WEB_BALL_COUNT(WINNER[rankIndex].MATCH_COUNT)}${
      WINNER[rankIndex].IS_BONUS ? OUTPUT_MESSAGE.WEB_BONUS_MATH : ''
    }</td>
    <td>${OUTPUT_MESSAGE.WEB_WIN_PRICE(WINNER[rankIndex].PRICE)}</td>
    <td>${OUTPUT_MESSAGE.WEB_BALL_COUNT(winResults[rankIndex - 1])}</td>
  </tr>`;
  },

  deleteModalInfo() {
    $('#lotto-return-ratio').innerText = '';
    [...$$('.win-results')].forEach((element) => {
      element.remove();
    });
  },

  resetModal() {
    this.hideSection();
    this.deleteModalInfo();
  },
};

export default LottoResultModalView;
