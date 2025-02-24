import './resultDashboard.css';

export default function ResultDashboard(playLotto) {
  const resultBackground = document.createElement('div');
  resultBackground.className = 'result-background';

  playLotto.appendChild(resultBackground);
}
