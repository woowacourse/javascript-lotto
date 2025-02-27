import './lottoDashboard.css';
import { createElement } from '../utils/dom';
import { PlayLotto } from '../playLotto';

export default function LottoDashboard() {
  const lottoDashboard = createElement('div', { class: 'lotto-dashboard' });
  const lottoHeader = createElement('span', { textContent: '🎱내 번호 당첨 확인🎱', class: 'lotto-header' });

  lottoDashboard.appendChild(lottoHeader);
  lottoDashboard.appendChild(PlayLotto());

  return lottoDashboard;
}
