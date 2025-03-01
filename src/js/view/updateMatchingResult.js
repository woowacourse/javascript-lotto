import { $ } from '../../util/selector.js';

const updateMatchingResult = (matchingResult, profitRate) => {
  $('#match-3').textContent = `${matchingResult[3]}개`;
  $('#match-4').textContent = `${matchingResult[4]}개`;
  $('#match-5').textContent = `${matchingResult[5]}개`;
  $('#match-bonus').textContent = `${matchingResult['bonus']}개`;
  $('#match-6').textContent = `${matchingResult[6]}개`;

  const profitRateText = `당신의 총 수익률은 ${profitRate}%입니다.`;
  $('#profit-rate').textContent = profitRateText;
};
export default updateMatchingResult;
