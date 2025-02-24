import './winningNumbers.css';

export default function winningNumbers(playLotto) {
  const winningNumberContainer = document.createElement('div');
  winningNumberContainer.className = 'winning-number-container';

  const winningNumberHeaders = document.createElement('div');
  winningNumberHeaders.className = 'winning-number-headers';

  const winningNumberHeader = document.createElement('p');
  winningNumberHeader.innerText = '당첨 번호';
  winningNumberHeader.className = 'header';

  const bonusNumberHeader = document.createElement('p');
  bonusNumberHeader.innerText = '보너스 번호';
  bonusNumberHeader.className = 'header';

  winningNumberHeaders.appendChild(winningNumberHeader);
  winningNumberHeaders.appendChild(bonusNumberHeader);

  playLotto.appendChild(winningNumberContainer);
}
