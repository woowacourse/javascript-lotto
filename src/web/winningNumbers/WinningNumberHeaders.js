import { createElement } from '../utils/dom';

export default function WinningNumberHeaders(winningNumberContainer) {
  const winningNumberHeaders = createElement('div', { class: 'winning-number-headers' });
  const winningNumberHeader = createElement('span', { class: 'header', textContent: '당첨 번호' });
  const bonusNumberHeader = createElement('span', { class: 'header', textContent: '보너스 번호' });

  winningNumberHeaders.appendChild(winningNumberHeader);
  winningNumberHeaders.appendChild(bonusNumberHeader);
  winningNumberContainer.appendChild(winningNumberHeaders);
}
