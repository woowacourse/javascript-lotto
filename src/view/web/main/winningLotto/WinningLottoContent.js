import WinningLottoForm from './WinningLottoForm.js';

export default function WinningLottoContent() {
  const winningLottoContainer = document.createElement('section');
  winningLottoContainer.classList.add('winning-lotto-container');

  const winningLottoTitle = document.createElement('span');
  winningLottoTitle.classList.add('winning-lotto-title');
  winningLottoTitle.innerText = '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.';

  winningLottoContainer.appendChild(winningLottoTitle);
  winningLottoContainer.appendChild(WinningLottoForm());

  return winningLottoContainer;
}
