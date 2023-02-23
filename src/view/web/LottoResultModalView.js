import { $ } from '../../util/web/dom';
import { RANK } from '../../constant/setting';

const LottoResultModalView = {
  render(ranking, profitRate) {
    const modalElement = $('#modal');

    modalElement.append(LottoResultModalView.resultTableContainer(ranking));
    modalElement.insertAdjacentHTML(
      'afterbegin',
      LottoResultModalView.closeButton() + LottoResultModalView.resultTitle(),
    );
    modalElement.insertAdjacentHTML(
      'beforeend',
      LottoResultModalView.profitRate(profitRate) + LottoResultModalView.restartButton(),
    );
  },

  resultTitle() {
    return '<h1 class="subtitle result-title">🏆 당첨 통계 🏆</h1>';
  },

  resultTableContainer(ranking) {
    const resultTableContainer = document.createElement('div');
    resultTableContainer.setAttribute('class', 'result-table-container');

    const resultTable = LottoResultModalView.resultTable(ranking);
    resultTableContainer.append(resultTable);

    return resultTableContainer;
  },

  resultTable(ranking) {
    const resultTable = document.createElement('table');
    resultTable.setAttribute('id', 'result-table');
    const tableBody = document.createElement('tbody');

    Object.entries(ranking).forEach(([rank, winningQuantity]) => {
      const resultTableRow = LottoResultModalView.tableRow(
        RANK[rank].MATCH_COUNT,
        RANK[rank].REWARDS,
        winningQuantity,
      );
      tableBody.innerHTML += resultTableRow;
    });

    resultTable.insertAdjacentHTML('afterbegin', LottoResultModalView.tableHead());
    resultTable.append(tableBody);

    return resultTable;
  },

  tableHead() {
    return '<thead><tr><td>일치 갯수</td><td>당첨금</td><td>당첨 갯수</td></tr></thead>';
  },

  tableRow(matchCount, reward, winningQuantity) {
    return `<tr><td>${matchCount}</td><td>${reward.toLocaleString(
      'ko-KR',
    )}</td><td>${winningQuantity}개</td></tr>`;
  },

  profitRate(profitRate) {
    return `<p class="result-profit-rate">당신의 총 수익률은 ${profitRate}%입니다.</p>`;
  },

  restartButton() {
    return '<button type="button" class="button caption" id="restart-button">다시 시작하기</button>';
  },

  closeButton() {
    return '<button type="button" id="modal-close-button" class="subtitle">X</button>';
  },
};

export default LottoResultModalView;
