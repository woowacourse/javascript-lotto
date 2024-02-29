import '../../css/modal.css';

import { appendChildren, makeElementById, makeElementWithClassName } from '../../utils';
import { RANK_WIN_AMOUNT } from '../../../Domain/WinLottoNumber';

const RANK_STRING = Object.freeze({
  1: '6개',
  2: '5개+보너스볼',
  3: '5개',
  4: '4개',
  5: '3개',
});

const ResultModal = Object.freeze({
  closeModal: () => {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.parentNode.removeChild(modalContainer);
  },

  makeModalElement: (winLottos, rateOfIncome) => {
    const modalContainer = makeElementById('div', 'modalContainer');
    const modalResultContainer = ResultModal.makeModalResultContainer(winLottos, rateOfIncome);
    modalContainer.appendChild(modalResultContainer);
    return modalContainer;
  },

  makeModalResultContainer: (winLottos, rateOfIncome) => {
    const modalResultContainer = makeElementById('div', 'modalResultContainer');
    appendChildren(modalResultContainer, ResultModal.makeModalResultContainerComponents(winLottos, rateOfIncome));
    return modalResultContainer;
  },

  makeModalResultContainerComponents: (winLottos, rateOfIncome) => [
    ResultModal.makeModalResultTitle(),
    ResultModal.makeModalResultRanks(winLottos),
    ResultModal.makeModalRateOfIncomeResult(rateOfIncome),
    ResultModal.makeModalRetryButton(),
    ResultModal.makeModalCloseButton(),
  ],

  makeModalResultTitle: () => {
    const modalResultTitle = makeElementWithClassName('div', 'modalResultTitle');
    modalResultTitle.innerHTML = '<h2>🏆 당첨 통계 🏆</h2>';
    return modalResultTitle;
  },

  makeModalResultRanks: (winLottos) => {
    winLottos.shift();
    const modalResultRankList = makeElementWithClassName('div', 'modalResultRankList');
    const modalResultRankTable = makeElementWithClassName('table', 'modalResultRankTable');
    appendChildren(modalResultRankTable, ResultModal.makeModalResultRankTableInformation(winLottos));
    modalResultRankList.appendChild(modalResultRankTable);
    return modalResultRankList;
  },

  makeModalResultRankTableInformation: (winLottos) => [
    ResultModal.makeModalResultRankHeader(),
    ...winLottos
      .map((count, index) => {
        const rank = index + 1;
        return ResultModal.makeModalResultRankData(count, rank);
      })
      .reverse(),
  ],

  makeModalResultRankHeader: () => {
    const modalResultRankRow = makeElementWithClassName('tr', 'modalResultRankRow');
    modalResultRankRow.innerHTML = `<th>일치 갯수</th>
    <th>당첨금</th>
    <th>당첨 갯수</th>`;
    return modalResultRankRow;
  },

  makeModalResultRankData: (count, rank) => {
    const modalResultRankRow = makeElementWithClassName('tr', 'modalResultRankRow');
    modalResultRankRow.innerHTML = `<tr>
  <td>${RANK_STRING[rank]}</td>
  <td>${RANK_WIN_AMOUNT[rank]}</td>
  <td>${count}</td>
</tr>`;
    return modalResultRankRow;
  },

  makeModalRateOfIncomeResult: (rate) => {
    const rateOfIncomeResultContainer = makeElementWithClassName('div', 'rateOfIncomeResultContainer');
    rateOfIncomeResultContainer.innerText = `당신의 수익률은 ${String(rate)}%입니다`;
    return rateOfIncomeResultContainer;
  },

  makeModalRetryButton: () => {
    const modalRetryButton = makeElementWithClassName('button', 'modalRetryButton');
    modalRetryButton.innerHTML = '다시 시작하기';
    return modalRetryButton;
  },

  makeModalCloseButton: () => {
    const modalCloseButton = makeElementWithClassName('button', 'modalCloseButton');
    modalCloseButton.innerHTML = '❌';
    return modalCloseButton;
  },
});

export default ResultModal;
