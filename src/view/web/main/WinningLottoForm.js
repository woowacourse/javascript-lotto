import { LOTTO_RULES } from '../../../constant/constants';
import ErrorMessage from '../utils/ErrorMessage';

export default function WinningLottoForm() {
  const form = document.createElement('form');
  form.setAttribute('id', 'winning-lotto-form');

  // 당첨 번호 입력
  const winningLottoInputContainer = document.createElement('div');
  winningLottoInputContainer.setAttribute('id', 'winning-lotto-input-container');

  const winningNumbersInputContainer = document.createElement('div');
  winningNumbersInputContainer.classList.add('number-input-container');

  const winningNumbersLabel = document.createElement('label');
  winningNumbersLabel.classList.add('winning-number-label');
  winningNumbersLabel.innerText = '당첨 번호';

  const winningNumbersInputSection = document.createElement('section');
  winningNumbersInputSection.setAttribute('id', 'winning-numbers-input');

  Array.from({ length: LOTTO_RULES.length }).forEach((_, idx) => {
    const numberInput = document.createElement('input');
    numberInput.setAttribute('id', `winning-number-${idx + 1}`);
    numberInput.setAttribute('type', 'number');
    numberInput.setAttribute('required', 'required');
    numberInput.setAttribute('min', LOTTO_RULES.min_number);
    numberInput.setAttribute('max', LOTTO_RULES.max_number);
    numberInput.classList.add('number-input');
    numberInput.classList.add('lotto-number');

    winningNumbersInputSection.appendChild(numberInput);
  });

  winningNumbersInputContainer.appendChild(winningNumbersLabel);
  winningNumbersInputContainer.appendChild(winningNumbersInputSection);

  // 보너스 숫자 입력
  const bonusNumberContainer = document.createElement('div');
  bonusNumberContainer.setAttribute('id', 'bonus-number-container');
  bonusNumberContainer.classList.add('number-input-container');

  const bonusNumberLabel = document.createElement('label');
  bonusNumberLabel.classList.add('winning-number-label');
  bonusNumberLabel.innerText = '보너스 번호';

  const bonusNumberInput = document.createElement('input');
  bonusNumberInput.setAttribute('id', 'bonus-number');
  bonusNumberInput.setAttribute('type', 'number');
  bonusNumberInput.setAttribute('required', 'required');
  bonusNumberInput.classList.add('number-input');
  bonusNumberInput.classList.add('bonus-number');

  bonusNumberContainer.appendChild(bonusNumberLabel);
  bonusNumberContainer.appendChild(bonusNumberInput);

  // 결과 확인하기 버튼
  const resultButton = document.createElement('button');
  resultButton.setAttribute('id', 'result-button');
  resultButton.innerText = '결과 확인하기';

  // 합치기
  winningLottoInputContainer.appendChild(winningNumbersInputContainer);
  winningLottoInputContainer.appendChild(bonusNumberContainer);
  form.appendChild(winningLottoInputContainer);
  form.appendChild(ErrorMessage('winning-number-error', ['input-error', 'hidden']));
  form.appendChild(resultButton);

  return form;
}
