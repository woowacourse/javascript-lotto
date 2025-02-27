import { createElement } from '../utils/dom';

export default function ResultDashboardHeader(resultDashboard) {
  const resultHeader = createElement('h1', { class: 'result-header', textContent: '🏆 당첨 통계 🏆' });
  resultDashboard.appendChild(resultHeader);
}
