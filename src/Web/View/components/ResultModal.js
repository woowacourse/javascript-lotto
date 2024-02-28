import '../../css/modal.css';

import { appendChildren, makeElementById, makeElementWithClassName } from '../../utils';

const ResultModal = Object.freeze({
  openModal: () => {},
  closeModal: () => {},
  makeModalElement: () => {
    const modalContainer = makeElementById('div', 'modalContainer');
    const modalResultContainer = ResultModal.makeModalResultContainer();
    modalContainer.appendChild(modalResultContainer);
    return modalContainer;
  },

  makeModalResultContainer: () => {
    const modalResultContainer = makeElementById('div', 'modalResultContainer');
    appendChildren(modalResultContainer, [
      ResultModal.makeModalResultTitle(),
      ResultModal.makeModalResultRanks(),
      ResultModal.makeModalRateOfIncomeResult(),
      ResultModal.makeModalRetryButton(),
      ResultModal.makeModalCloseButton(),
    ]);
    return modalResultContainer;
  },

  makeModalResultTitle: () => {
    const modalResultTitle = makeElementWithClassName('div', 'modalResultTitle');
    modalResultTitle.innerText = '🏆 당첨 통계 🏆';
    return modalResultTitle;
  },

  makeModalResultRanks: () => {
    const modalResultRankList = makeElementWithClassName('div', 'modalResultRankList');
    const modalResultRankTable = makeElementWithClassName('table', 'modalResultRankTable');
    appendChildren(modalResultRankTable, [
      ResultModal.makeModalResultRankHeader(),
      ...Array.from({ length: 5 }, () => ResultModal.makeModalResultRankData()),
    ]);
    modalResultRankList.appendChild(modalResultRankTable);
    return modalResultRankList;
  },

  makeModalResultRankHeader: () => {
    const modalResultRankRow = makeElementWithClassName('tr', 'modalResultRankRow');
    modalResultRankRow.innerHTML = `<th>일치 갯수</th>
    <th>당첨금</th>
    <th>당첨 갯수</th>`;
    return modalResultRankRow;
  },

  makeModalResultRankData: () => {
    const modalResultRankRow = makeElementWithClassName('tr', 'modalResultRankRow');
    modalResultRankRow.innerHTML = `<tr>
  <td>3개</td>
  <td>5000원</td>
  <td>n개</td>
</tr>`;
    return modalResultRankRow;
  },

  makeModalRateOfIncomeResult: (rate = '5,000') => {
    const rateOfIncomeResultContainer = makeElementWithClassName('div', 'rateOfIncomeResultContainer');
    rateOfIncomeResultContainer.innerText = `당신의 수익률은 ${rate}%입니다`;
    return rateOfIncomeResultContainer;
  },

  makeModalRetryButton: () => {
    const modalRetryButton = makeElementById('button', 'modalRetryButton');
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
