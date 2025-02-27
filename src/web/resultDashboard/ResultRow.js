import { createElement } from '../utils/dom';

export default function ResultRow(type, prize, count) {
  const resultRow = createElement('div', { class: 'result-rows' });

  const typeOfMatch = createElement('div', { class: 'result-col', textContent: type });
  resultRow.appendChild(typeOfMatch);
  const winningPrize = createElement('div', { class: 'result-col', textContent: prize });
  resultRow.appendChild(winningPrize);
  const matchCounts = createElement('div', { class: 'result-col', textContent: count });
  resultRow.appendChild(matchCounts);

  return resultRow;
}
