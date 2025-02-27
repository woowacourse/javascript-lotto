import { createElement } from '../utils/dom';

export default function LottoWinningRevenue(resultDashboard, revenue) {
  const revenueTag = createElement('div', { class: 'revenue', textContent: `당신의 총 수익률은 ${revenue}%입니다.` });
  resultDashboard.appendChild(revenueTag);
}
