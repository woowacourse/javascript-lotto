import { $, $$ } from '../utils/querySelector.js';

const $modal = $('.modal');

const winningCountTemplate = (winningCount) => {
  return `<td class="p-3">${winningCount}개</td>`;
};

export const openModal = () => {
  $modal.classList.add('open');
};

export const closeModal = () => {
  $modal.classList.remove('open');
};

export const renderRankCount = (rankCountMap) => {
  const $$resultRankCount = $$('.result-rank-count');
  $$resultRankCount.forEach(($resultRankCount, index) => {
    $resultRankCount.innerText = `${rankCountMap.get(5 - index)}개`;
  });
};

export const renderTotalYield = (totalYield) => {
  const $resultTotalYield = $('#result-total-yield');

  $resultTotalYield.innerText = `당신의 총 수익률은 ${totalYield}%입니다.`;
};

export const renderModal = (rankCountMap, totalYield) => {
  renderRankCount(rankCountMap);
  renderTotalYield(totalYield);
};
