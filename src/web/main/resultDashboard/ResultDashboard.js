import './resultDashboard.css';

export default function ResultDashboard(playLotto) {
  const resultDashboard = document.createElement('div');
  resultDashboard.className = 'result-dashboard';

  ResultBackground(resultDashboard);

  playLotto.appendChild(resultDashboard);
}

function ResultBackground(resultDashboard) {
  const resultBackground = document.createElement('div');
  resultBackground.className = 'result-background';
  resultDashboard.appendChild(resultBackground);
}
