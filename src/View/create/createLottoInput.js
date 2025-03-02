import SELECTORS from '../../constants/Selectors.js';

function createLottoInput() {
  const lottoInputContainer = document.createElement('div');
  lottoInputContainer.classList.add(SELECTORS.CONTAINER.LOTTO_INPUT);

  const description = document.createElement('div');
  description.textContent =
    '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요';

  const numInputContainer = document.createElement('div');
  numInputContainer.classList.add('num-input-container');

  const form = document.createElement('form');
  form.classList.add('input-form');
  form.id = 'lotto-form';

  const winningNumContainer = document.createElement('div');
  winningNumContainer.classList.add(SELECTORS.CONTAINER.WINNING_NUMBER);

  const winningLabel = document.createElement('label');
  winningLabel.textContent = '당첨 번호';

  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('input-wrapper');

  for (let i = 0; i < 6; i++) {
    const input = document.createElement('input');
    input.classList.add(SELECTORS.INPUT.WINNING_NUMBER);
    input.maxLength = 2;
    inputWrapper.appendChild(input);
  }

  winningNumContainer.appendChild(winningLabel);
  winningNumContainer.appendChild(inputWrapper);

  const bonusNumContainer = document.createElement('div');
  bonusNumContainer.classList.add(SELECTORS.CONTAINER.BONUS_NUMBER);

  const bonusLabel = document.createElement('label');
  bonusLabel.textContent = '보너스 번호';

  const bonusInput = document.createElement('input');
  bonusInput.id = SELECTORS.INPUT.BONUS_NUMBER;
  bonusInput.maxLength = 2;

  bonusNumContainer.appendChild(bonusLabel);
  bonusNumContainer.appendChild(bonusInput);

  form.appendChild(winningNumContainer);
  form.appendChild(bonusNumContainer);

  const checkResultBtn = document.createElement('button');
  checkResultBtn.id = SELECTORS.BUTTON.RESULT;
  checkResultBtn.textContent = '결과 확인하기';

  numInputContainer.appendChild(form);
  lottoInputContainer.appendChild(description);
  lottoInputContainer.appendChild(numInputContainer);
  lottoInputContainer.appendChild(checkResultBtn);

  document.querySelector('.card-content').appendChild(lottoInputContainer);
}

export default createLottoInput;
