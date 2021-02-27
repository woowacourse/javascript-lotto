import { $, $$ } from '../utils/querySelector.js';

export const renderRankCount = (rankCountMap) => {
  const $$resultRankCount = $$('.result-modal__rank-count');
  $$resultRankCount.forEach(($resultRankCount, index) => {
    $resultRankCount.innerText = `${rankCountMap.get(5 - index)}개`;
  });
};

export const renderTotalYield = (totalYield) => {
  const $resultTotalYield = $('#result-modal__total-yield');

  $resultTotalYield.innerText = `당신의 총 수익률은 ${totalYield}%입니다.`;
};

export const renderResultModal = (rankCountMap, totalYield) => {
  renderRankCount(rankCountMap);
  renderTotalYield(totalYield);
};
