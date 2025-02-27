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
      <td>${matchText}</td>
      <td>${prize}</td>
      <td>${count}</td>
    </tr>`;
}

function getTableWrapperMarkup(rowsMarkup) {
  return `<table>
    <thead>
      <tr>
        <th>일치 개수</th>
        <th>당첨금</th>
        <th>당첨 개수</th>
      </tr>
    </thead>
    <tbody>
      ${rowsMarkup}
    </tbody>
  </table>`;
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
        <strong>당신의 총 수익률은 ${profitRate}%입니다.</strong>
        <button class="big-button">다시 시작하기</button>
      </div>
    </div>
  `;
}

export default getModalMarkup;
