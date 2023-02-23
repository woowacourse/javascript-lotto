import { $ } from '../utils/dom';
import { RANK } from '../../constants/setting';

const closeButton = '<button type="button" id="modal-close-button" class="subtitle">X</button>';
const resultTitle = '<h1 class="subtitle result-title">🏆 당첨 통계 🏆</h1>';
const resultTableHead =
  '<thead><tr><td>일치 갯수</td><td>당첨금</td><td>당첨 갯수</td></tr></thead>';
const restartButton =
  '<button type="button" class="button caption" id="restart-button">다시 시작하기</button>';

const createResultTableRow = (matchCount, reward, winningQuantity) =>
  `<tr><td>${matchCount}</td><td>${reward.toLocaleString(
    'ko-KR',
  )}</td><td>${winningQuantity}개</td></tr>`;

const createResultTable = (ranking) => {
  const container = document.createElement('div');
  container.setAttribute('class', 'result-table-container');

  const resultTable = document.createElement('table');
  resultTable.setAttribute('id', 'result-table');
  const tableBody = document.createElement('tbody');

  Object.entries(ranking).forEach(([rank, winningQuantity]) => {
    const resultTableRow = createResultTableRow(
      RANK[rank].MATCH_COUNT,
      RANK[rank].REWARDS,
      winningQuantity,
    );
    tableBody.innerHTML += resultTableRow;
  });

  resultTable.insertAdjacentHTML('afterbegin', resultTableHead);
  resultTable.append(tableBody);
  container.append(resultTable);

  return container;
};

const createProfitRageParagraph = (profitRate) =>
  `<p class="result-profit-rate">당신의 총 수익률은 ${profitRate}%입니다.</p>`;

const renderLottoResultModal = (ranking, profitRate) => {
  const modalElement = $('#modal');

  modalElement.append(createResultTable(ranking));
  modalElement.insertAdjacentHTML('afterbegin', closeButton + resultTitle);
  modalElement.insertAdjacentHTML(
    'beforeend',
    createProfitRageParagraph(profitRate) + restartButton,
  );
};

export default renderLottoResultModal;
