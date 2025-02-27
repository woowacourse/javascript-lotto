import { createElement } from '../utils/dom';

export default function ResultCols(resultDashboard) {
  const resultCols = createElement('div', { class: 'result-rows' });

  const typeOfMatch = createElement('div', { class: 'result-col', textContent: '일치 갯수' });
  resultCols.appendChild(typeOfMatch);
  const winningPrize = createElement('div', { class: 'result-col', textContent: '당첨금' });
  resultCols.appendChild(winningPrize);
  const matchCounts = createElement('div', { class: 'result-col', textContent: '당첨 횟수' });
  resultCols.appendChild(matchCounts);

  resultDashboard.appendChild(resultCols);
}
