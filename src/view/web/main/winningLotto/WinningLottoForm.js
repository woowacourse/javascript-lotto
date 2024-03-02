import ErrorMessage from '../../utils/ErrorMessage.js';
import BonusNumberContainer from './bonusNumber/BonusNumberContainer.js';
import WinningNumbersContainer from './winningNumbers/WinningNumbersContainer.js';

export default function WinningLottoForm() {
  const form = document.createElement('form');
  form.setAttribute('id', 'winning-lotto-form');

  const winningLottoInputContainer = document.createElement('div');
  winningLottoInputContainer.setAttribute('id', 'winning-lotto-input-container');

  // 결과 확인하기 버튼
  const resultButton = document.createElement('button');
  resultButton.setAttribute('id', 'result-button');
  resultButton.innerText = '결과 확인하기';

  // 합치기
  winningLottoInputContainer.appendChild(WinningNumbersContainer());
  winningLottoInputContainer.appendChild(BonusNumberContainer());

  form.appendChild(winningLottoInputContainer);
  form.appendChild(ErrorMessage('winning-number-error', ['input-error', 'hidden']));
  form.appendChild(resultButton);

  return form;
}
