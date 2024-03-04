import { RateOfReturnCalculator, WinningRankCalculator } from '../domain';
import './LottoResultTable.css';

const winningPrize = RateOfReturnCalculator.WINNING_PRIZE_DETAIL;
const rankRule = WinningRankCalculator.RANK_RULE;

const LOTTO_RESULT_TABLE = `
  <div class="divider"></div>
  <div class="table-col">
    <div class="count-row">
      <p class="table-title">일치 갯수</p>
    </div>
    <div class="prize-row">
      <p class="table-title">당첨금</p>
    </div>
    <div class="match-row">
      <p class="table-title">당첨 갯수</p>
    </div>
  </div>
  <div class="divider"></div>
`;

const LOTTO_RESULT_TABLE_COL = ({ rank, match }) => `
<div class = "table-col">
  <div class="count-row">
    <p class="lotto-body">${rankRule[rank].match}개</p>
  </div>
  <div class="prize-row">
    <p class="lotto-body">${winningPrize[rank].toLocaleString('ko-KR')}원</p>
  </div>
  <div class="match-row">
    <p class="lotto-body">${match}개</p>
  </div>
</div>
<div class="divider"></div>
`;

class LottoResultTable extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const app = document.querySelector('lotto-app');
    const { winningRankResult } = app.controller().getLottoGameInfo();
    let contents = LOTTO_RESULT_TABLE;
    for (const [rank, match] of Object.entries(winningRankResult).reverse()) {
      contents += LOTTO_RESULT_TABLE_COL({ rank, match });
    }
    this.innerHTML = contents;
  }
}

customElements.define('lotto-result-table', LottoResultTable);
