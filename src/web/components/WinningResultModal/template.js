function getRowsData(winningCounts) {
  return [
    ['3개', '5,000', `${winningCounts[0] ?? 0}개`],
    ['4개', '50,000', `${winningCounts[1] ?? 0}개`],
    ['5개', '1,500,000', `${winningCounts[2] ?? 0}개`],
    ['5개 + 보너스볼', '30,000,000', `${winningCounts[3] ?? 0}개`],
    ['6개', '2,000,000,000', `${winningCounts[4] ?? 0}개`],
  ];
}

function getTableRow(row) {
  const [matchText, prize, count] = row;
  return `
    <tr>
      <td class="modal-table-data">${matchText}</td>
      <td class="modal-table-data">${prize}</td>
      <td class="modal-table-data">${count}</td>
    </tr>
  `;
}

// eslint-disable-next-line max-lines-per-function
function getTableWrapperMarkup(rowsMarkup) {
  return `
    <table class="modal-table">
      <thead>
        <tr>
          <th class="modal-table-header">일치 개수</th>
          <th class="modal-table-header">당첨금</th>
          <th class="modal-table-header">당첨 개수</th>
        </tr>
      </thead>
      <tbody>
        ${rowsMarkup}
      </tbody>
    </table>
  `;
}

function getTableMarkup(winningCounts) {
  const rows = getRowsData(winningCounts);
  const rowsMarkup = rows.map((row) => getTableRow(row)).join('');
  return getTableWrapperMarkup(rowsMarkup);
}

function getModalMarkup(winningCounts, profitRate) {
  return `
    <div class="modal-backdrop">
      <div class="modal-content">
        <button class="modal-close-button">✕</button>
        <h2>🏆 당첨 통계 🏆</h2>
        ${getTableMarkup(winningCounts)}
        <strong>당신의 총 수익률은 ${profitRate.toFixed(1).toLocaleString()}%입니다.</strong>
        <button class="restart-button">다시 시작하기</button>
      </div>
    </div>
  `;
}

export default getModalMarkup;
