import { RANK } from '../../constants/setting';

const resultTableHead =
  '<thead><tr><td>일치 갯수</td><td>당첨금</td><td>당첨 갯수</td></tr></thead>';

const createResultTableRow = (matchCount, reward, winningQuantity) =>
  `<tr>
    <td>${matchCount}</td>
    <td>${reward.toLocaleString('ko-KR')}</td>
    <td>${winningQuantity}개</td>
  </tr>`;

const createTableBody = (ranking) => `
  <tbody>
    ${Object.entries(ranking)
      .map(([rank, winningQuantity]) =>
        createResultTableRow(RANK[rank].MATCH_COUNT, RANK[rank].REWARDS, winningQuantity),
      )
      .join('')}
  </tbody>
`;

const createResultTable = (ranking) => `
  <div id="result-table-container">
    <table id="result-table">
      ${resultTableHead + createTableBody(ranking)}
    </table>
  </div>
`;

const createResultModal = (ranking, profitRate) => `
  <button type="button" id="modal-close-button" class="subtitle">X</button>
  <h1 class="subtitle result-title">🏆 당첨 통계 🏆</h1>
  ${createResultTable(ranking)}
  <p class="result-profit-rate">당신의 총 수익률은 ${profitRate.toLocaleString('ko-KR')}%입니다.</p>
  <button type="button" class="button caption" id="restart-button">다시 시작하기</button>
`;

export default createResultModal;
