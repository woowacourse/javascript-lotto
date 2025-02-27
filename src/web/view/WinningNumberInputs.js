import { LOTTO } from '../../domain/lottoConstants';
import { createElement } from '../utils/dom';

export default function WinningNumberInputs(winningNumberContainer) {
  const winningAndBonusInputContainer = createElement('div', { class: 'winning-and-bonus-input-container' });

  const winningNumbersArray = new Array(6).fill(0);
  const bonusNumber = { value: 0 };
  const winningInputs = createElement('div', { class: 'winning-inputs' });

  CreateSixWinningInputs({ winningAndBonusInputContainer, winningInputs, winningNumbersArray });
  CreateBonusInput(winningAndBonusInputContainer, bonusNumber);

  winningNumberContainer.appendChild(winningAndBonusInputContainer);
  return { winningNumbersArray, bonusNumber };
}

function CreateSixWinningInputs({ winningAndBonusInputContainer, winningInputs, winningNumbersArray }) {
  Array.from({ length: LOTTO.MAX_LENGTH }, (_, idx) => {
    const winningNumberInput = createElement('input', { type: 'text', class: 'winning-input' });
    winningNumberInput.addEventListener('input', (e) => {
      winningNumbersArray[idx] = Number(e.target.value);
    });

    winningInputs.appendChild(winningNumberInput);
  });

  winningAndBonusInputContainer.appendChild(winningInputs);
}

function CreateBonusInput(winningAndBonusInputContainer, bonusNumber) {
  const bonusNumberInput = createElement('input', { type: 'text', class: 'bonus-input' });
  bonusNumberInput.addEventListener('input', (e) => {
    bonusNumber.value = Number(e.target.value);
  });

  winningAndBonusInputContainer.appendChild(bonusNumberInput);
}
