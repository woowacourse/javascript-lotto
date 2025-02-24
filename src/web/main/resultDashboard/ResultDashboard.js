import './resultDashboard.css';

export default function ResultDashboard(playLotto) {
  const resultDashboard = document.createElement('div');
  resultDashboard.className = 'result-dashboard';

  ResultBackground(resultDashboard);

  const resultHeader = document.createElement('h1');
  resultHeader.innerText = '🏆 당첨 통계 🏆';
  resultHeader.className = 'result-header';
  resultDashboard.appendChild(resultHeader);

  playLotto.appendChild(resultDashboard);
}

function ResultBackground(resultDashboard) {
  const resultBackground = document.createElement('div');
  resultBackground.className = 'result-background';
  resultDashboard.appendChild(resultBackground);
}
