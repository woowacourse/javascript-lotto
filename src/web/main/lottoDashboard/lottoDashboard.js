import PlayLotto from '../playLotto/playLotto';
import './lottoDashboard.css';

export default function lottoDashboard() {
  const lottoDashboard = document.createElement('div');
  lottoDashboard.className = 'lotto-dashboard';

  const lottoHeader = document.createElement('p');
  lottoHeader.innerText = '🎱내 번호 당첨 확인🎱';
  lottoHeader.className = 'lotto-header';

  lottoDashboard.appendChild(lottoHeader);
  lottoDashboard.appendChild(PlayLotto());

  return lottoDashboard;
}
