import './resultDashboard.css';

export default function ResultDashboard(playLotto, matchCounts) {
  const resultDashboard = document.createElement('div');
  resultDashboard.className = 'result-dashboard';

  const resultBackground = ResultBackground(playLotto);
  CloseButton(resultDashboard, resultBackground);
  ResultHeader(resultDashboard);
  ResultContainer(resultDashboard, matchCounts);

  playLotto.appendChild(resultBackground);
  playLotto.appendChild(resultDashboard);
}

function CloseButton(resultDashboard, resultBackground) {
  const closeButton = document.createElement('button');
  closeButton.innerText = 'X';
  closeButton.className = 'close-button';
  closeButton.addEventListener('click', () => {
    resultBackground.remove();
    resultDashboard.remove();
  });

  resultDashboard.appendChild(closeButton);
}

function ResultHeader(resultDashboard) {
  const resultHeader = document.createElement('h1');
  resultHeader.innerText = '🏆 당첨 통계 🏆';
  resultHeader.className = 'result-header';
  resultDashboard.appendChild(resultHeader);
}

function ResultContainer(resultDashboard, matchCounts) {
  const resultContainer = document.createElement('div');

  DividerLine(resultContainer);
  ResultCols(resultContainer);
  DividerLine(resultContainer);

  resultContainer.className = 'result-container';
  resultDashboard.appendChild(resultContainer);
}

function ResultBackground() {
  const resultBackground = document.createElement('div');
  resultBackground.className = 'result-background';

  return resultBackground;
}

function ResultCols(resultDashboard) {
  const resultCols = document.createElement('div');
  resultCols.className = 'result-rows';

  const typeOfMatch = document.createElement('div');
  typeOfMatch.innerText = '일치 갯수';
  typeOfMatch.className = 'result-col';
  resultCols.appendChild(typeOfMatch);

  const winningPrize = document.createElement('div');
  winningPrize.innerText = '당첨금';
  winningPrize.className = 'result-col';
  resultCols.appendChild(winningPrize);

  const matchCounts = document.createElement('div');
  matchCounts.innerText = '당첨 횟수';
  matchCounts.className = 'result-col';
  resultCols.appendChild(matchCounts);

  resultDashboard.appendChild(resultCols);
}

function DividerLine(resultContainer) {
  const dividerLine = document.createElement('div');
  dividerLine.className = 'divider-line';
  resultContainer.appendChild(dividerLine);
}
