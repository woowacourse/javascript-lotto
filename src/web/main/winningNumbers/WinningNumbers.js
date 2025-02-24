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
  winningNumberContainer.appendChild(winningNumberHeaders);
}

function WinningNumberInputs(winningNumberContainer) {
  const winningAndBonusInputContainer = document.createElement('div');
  winningAndBonusInputContainer.className = 'winning-and-bonus-input-container';

  const winningNumbersArray = new Array(6).fill(0);
  const bonusNumber = { value: 0 };
  const winningInputs = document.createElement('div');
  winningInputs.className = 'winning-inputs';
  Array.from({ length: 6 }, (_, idx) => {
    const winningNumberInput = document.createElement('input');
    winningNumberInput.type = 'text';
    winningNumberInput.className = 'winning-input';
    winningNumberInput.addEventListener('input', (e) => {
      winningNumbersArray[idx] = Number(e.target.value);
    });

    winningInputs.appendChild(winningNumberInput);
  });
  winningAndBonusInputContainer.appendChild(winningInputs);

  const bonusNumberInput = document.createElement('input');
  bonusNumberInput.type = 'text';
  bonusNumberInput.className = 'bonus-input';
  bonusNumberInput.addEventListener('input', (e) => {
    bonusNumber.value = Number(e.target.value);
  });

  winningAndBonusInputContainer.appendChild(bonusNumberInput);

  winningNumberContainer.appendChild(winningAndBonusInputContainer);
  return { winningNumbersArray, bonusNumber };
}
