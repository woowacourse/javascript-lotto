import WinningNumbersInput from './WinningNumbersInput.js';
import { LOTTO_RULES } from '../../../../../constant/constants.js';

export default function WinningNumbersContainer() {
  const winningNumbersContainer = document.createElement('div');
  winningNumbersContainer.classList.add('number-input-container');

  const winningNumbersLabel = document.createElement('label');
  winningNumbersLabel.classList.add('winning-number-label');
  winningNumbersLabel.classList.add('number-input-label-font');
  winningNumbersLabel.innerText = '당첨 번호';

  const winningNumbersInputSection = document.createElement('section');
  winningNumbersInputSection.classList.add('winning-numbers-input-section');

  Array.from({ length: LOTTO_RULES.length }).forEach((_, idx) => {
    winningNumbersInputSection.appendChild(WinningNumbersInput(idx + 1));
  });

  winningNumbersContainer.appendChild(winningNumbersLabel);
  winningNumbersContainer.appendChild(winningNumbersInputSection);

  return winningNumbersContainer;
}
