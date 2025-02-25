import { createElement } from '../../utils/dom';
import './winningNumbers.css';

export default function WinningNumbers(playLotto) {
  const winningNumberContainer = document.createElement('div');
  winningNumberContainer.className = 'winning-number-container';

  WinningNumberHeaders(winningNumberContainer);
  const { winningNumbersArray, bonusNumber } = WinningNumberInputs(winningNumberContainer);

  playLotto.appendChild(winningNumberContainer);
  return { winningNumbersArray, bonusNumber };
}

function WinningNumberHeaders(winningNumberContainer) {
  const winningNumberHeaders = createElement('div', { class: 'winning-number-headers' });
  const winningNumberHeader = createElement('span', { class: 'header', textContent: '당첨 번호' });
  const bonusNumberHeader = createElement('span', { class: 'header', textContent: '보너스 번호' });

  winningNumberHeaders.appendChild(winningNumberHeader);
  winningNumberHeaders.appendChild(bonusNumberHeader);
  winningNumberContainer.appendChild(winningNumberHeaders);
}

function WinningNumberInputs(winningNumberContainer) {
  const winningAndBonusInputContainer = createElement('div', { class: 'winning-and-bonus-input-container' });

  const winningNumbersArray = new Array(6).fill(0);
  const bonusNumber = { value: 0 };
  const winningInputs = createElement('div');
  winningInputs.className = 'winning-inputs';
  Array.from({ length: 6 }, (_, idx) => {
    const winningNumberInput = createElement('input', { type: 'text', class: 'winning-input' });
    winningNumberInput.addEventListener('input', (e) => {
      winningNumbersArray[idx] = Number(e.target.value);
    });

    winningInputs.appendChild(winningNumberInput);
  });
  winningAndBonusInputContainer.appendChild(winningInputs);

  const bonusNumberInput = createElement('input', { type: 'text', class: 'bonus-input' });
  bonusNumberInput.addEventListener('input', (e) => {
    bonusNumber.value = Number(e.target.value);
  });

  winningAndBonusInputContainer.appendChild(bonusNumberInput);

  winningNumberContainer.appendChild(winningAndBonusInputContainer);
  return { winningNumbersArray, bonusNumber };
}
