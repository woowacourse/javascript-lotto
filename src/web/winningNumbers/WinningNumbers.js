import './winningNumbers.css';
import { createElement } from '../utils/dom';
import WinningNumberHeaders from './WinningNumberHeaders';
import WinningNumberInputs from '../view/WinningNumberInputs';

export default function WinningNumbers(playLotto) {
  const winningNumberContainer = createElement('div', { class: 'winning-number-container' });

  WinningNumberHeaders(winningNumberContainer);
  const { winningNumbersArray, bonusNumber } = WinningNumberInputs(winningNumberContainer);

  playLotto.appendChild(winningNumberContainer);
  return { winningNumbersArray, bonusNumber };
}
