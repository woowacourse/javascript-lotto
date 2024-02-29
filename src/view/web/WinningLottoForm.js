export default function WinningLottoForm() {
  const form = document.createElement('form');
  form.setAttribute('id', 'winning-lotto-form');

  // 당첨 번호 입력
  const winningLottoInputContainer = document.createElement('div');
  winningLottoInputContainer.setAttribute('id', 'winning-lotto-input-container');

  const winningNumbersInputContainer = document.createElement('div');
  winningNumbersInputContainer.classList.add('number-input-container');

  const winningNumbersLabel = document.createElement('label');
  winningNumbersLabel.innerText = '당첨 번호';

  const winningNumbersInputSection = document.createElement('section');
  winningNumbersInputSection.setAttribute('id', 'winning-numbers-input');

  Array.from({ length: 6 }).forEach(() => {
    const numberInput = document.createElement('input');
    numberInput.setAttribute('type', 'number');
    numberInput.setAttribute('required', 'required');
    numberInput.setAttribute('min', '1');
    numberInput.setAttribute('max', '45');
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
  bonusNumberLabel.innerText = '보너스 번호';

  const bonusNumberInput = document.createElement('input');
  bonusNumberInput.setAttribute('type', 'number');
  bonusNumberInput.setAttribute('required', 'required');
  bonusNumberInput.classList.add('number-input');
  bonusNumberInput.classList.add('bonus-number');

  bonusNumberContainer.appendChild(bonusNumberLabel);
  bonusNumberContainer.appendChild(bonusNumberInput);

  // 에러 메시지
  const errorMessage = document.createElement('span');
  errorMessage.classList.add('input-error');

  // 결과 확인하기 버튼
  const submitResult = document.createElement('input');
  submitResult.setAttribute('id', 'submitResult');
  submitResult.setAttribute('type', 'submit');
  submitResult.setAttribute('value', '결과 확인하기');

  // 합치기

  winningLottoInputContainer.appendChild(winningNumbersInputContainer);
  winningLottoInputContainer.appendChild(bonusNumberContainer);
  form.appendChild(winningLottoInputContainer);
  form.appendChild(errorMessage);
  form.appendChild(submitResult);

  return form;
}

{
  /* <form id="winning-lotto-form">
  <div id="winning-lotto-input-container">
    <div class="number-input-container">
      <label>당첨 번호</label>
      <div id="winning-numbers-input">
        <input type="number" required min="1" max="45" class="number-input lotto-number" />
        <input type="number" required min="1" max="45" class="number-input lotto-number" />
        <input type="number" required min="1" max="45" class="number-input lotto-number" />
        <input type="number" required min="1" max="45" class="number-input lotto-number" />
        <input type="number" required min="1" max="45" class="number-input lotto-number" />
        <input type="number" required min="1" max="45" class="number-input lotto-number" />
      </div>
    </div>

    <div id="bonus-number-container" class="number-input-container">
      <label>보너스 번호</label>
      <input type="number" required class="number-input bonus-number" />
    </div>
  </div>
  <span class="input-error"></span>

  <input id="submitResult" type="submit" value="결과 확인하기" />
</form>; */
}
