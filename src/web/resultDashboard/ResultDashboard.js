import './resultDashboard.css';
import CloseButton from './CloseButton';
import ResultDashboardHeader from './ResultDashboardHeader';
import { createElement } from '../utils/dom';
import ReplayLottoButton from './ReplayLottoButton';
import LottoWinningRevenue from './LottoWinningRevenue';
import ResultContainer from './ResultContainer';

export default function ResultDashboard(playLotto, matchCounts, revenue) {
  const resultDashboard = createElement('div');
  resultDashboard.className = 'result-dashboard';

  const resultBackground = createElement('div', { class: 'result-background' });
  CloseButton(resultDashboard, resultBackground);
  ResultDashboardHeader(resultDashboard);
  ResultContainer(resultDashboard, matchCounts);
  LottoWinningRevenue(resultDashboard, revenue);

  ReplayLottoButton(resultDashboard);

  playLotto.appendChild(resultBackground);
  playLotto.appendChild(resultDashboard);
}
