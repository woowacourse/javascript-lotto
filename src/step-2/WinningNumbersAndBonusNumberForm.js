import { userLottoStore, winningLottoAndBonusNumberStore, winningNumbersAndBonusNumberFormStore } from './stores.js';
import WinningLottoAndBonusNumber from '../step-1/WinningLottoAndBonusNumber.js';
import Lotto from '../step-1/Lotto.js';
import { validateBonusNumber, validateWinningNumber } from './validates.js';

const WinningNumbersAndBonusNumberForm = {
  render(container) {
    this.init();

    if (!userLottoStore.hasTrigger('winning-numbers-and-bonus-number-form')) {
      userLottoStore.appendTrigger(
        'winning-numbers-and-bonus-number-form', () => this.render(container),
      );
    }

    if (!userLottoStore.getState().purchaseAmount) return;

    const winningLottoAndBonusNumberForm = document.createElement('form');
    const descriptionDiv = document.createElement('div');
    const winningLottoAndBonusNumberWrapper = document.createElement('div');

    const winningNumbersWrapper = document.createElement('div');
    const winningNumbersCaption = document.createElement('div');
    const winningNumbersInputWrapper = document.createElement('div');
    const winningNumberInputs = Array.from({ length: 6 }).map(() => document.createElement('input'));

    const bonusNumberWrapper = document.createElement('div');
    const bonusNumberCaption = document.createElement('label');
    const bonusNumberInput = document.createElement('input');

    const errorMessageDiv = document.createElement('div');
    const resultCheckButton = document.createElement('button');

    winningLottoAndBonusNumberForm.id = 'winning-lotto-and-bonus-number-form';
    winningLottoAndBonusNumberForm.classList.add('winning-lotto-and-bonus-number-form');
    winningLottoAndBonusNumberForm.addEventListener('submit', this.handleSubmit);

    descriptionDiv.innerText = '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.';
    winningLottoAndBonusNumberWrapper.classList.add('winning-numbers-and-bonus-number-wrapper');
    winningNumbersWrapper.classList.add('winning-numbers-wrapper');
    winningNumbersInputWrapper.classList.add('winning-numbers-input-wrapper');
    bonusNumberWrapper.classList.add('bonus-number-wrapper');

    winningNumbersCaption.innerText = '당첨 번호';

    bonusNumberCaption.innerText = '보너스 번호';
    bonusNumberCaption.htmlFor = 'bonus-number';

    winningNumberInputs.forEach((input, i) => {
      input.id = `winning-number-input-${i + 1}`;
      input.type = 'number';
      input.name = `winningNumber${i + 1}`;
      input.ariaLabel = `${i + 1}번째 당첨 번호`;
      input.classList.add('winning-number-input');
      input.addEventListener('input', this.handleWinningNumberInput);
    });

    bonusNumberInput.id = 'bonus-number-input';
    bonusNumberInput.type = 'number';
    bonusNumberInput.name = 'bonusNumber';
    bonusNumberInput.addEventListener('input', this.handleBonusNumberInput);

    errorMessageDiv.id = 'winning-numbers-and-bonus-number-error-message';

    resultCheckButton.id = 'result-check-button';
    resultCheckButton.type = 'submit';
    resultCheckButton.innerText = '결과 확인하기';
    resultCheckButton.disabled = true;
    resultCheckButton.classList.add('result-check-button');

    winningNumberInputs.forEach((input) => winningNumbersInputWrapper.appendChild(input));
    winningNumbersWrapper.appendChild(winningNumbersCaption);
    winningNumbersWrapper.appendChild(winningNumbersInputWrapper);
    bonusNumberWrapper.appendChild(bonusNumberCaption);
    bonusNumberWrapper.appendChild(bonusNumberInput);

    winningLottoAndBonusNumberWrapper.appendChild(winningNumbersWrapper);
    winningLottoAndBonusNumberWrapper.appendChild(bonusNumberWrapper);

    winningLottoAndBonusNumberForm.appendChild(descriptionDiv);
    winningLottoAndBonusNumberForm.appendChild(winningLottoAndBonusNumberWrapper);
    winningLottoAndBonusNumberForm.appendChild(errorMessageDiv);
    winningLottoAndBonusNumberForm.appendChild(resultCheckButton);

    container.appendChild(winningLottoAndBonusNumberForm);
  },

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { winningNumber1, winningNumber2, winningNumber3, winningNumber4, winningNumber5, winningNumber6, bonusNumber } = Object.fromEntries(formData.entries());
    const winningNumbers = [winningNumber1, winningNumber2, winningNumber3, winningNumber4, winningNumber5, winningNumber6].map(Number);
    const winningLottoAndBonusNumber = new WinningLottoAndBonusNumber(new Lotto(winningNumbers), Number(bonusNumber));
    winningLottoAndBonusNumberStore.setState({ winningLottoAndBonusNumber });
  },

  handleWinningNumberInput() {
    const submitButton = document.getElementById('result-check-button');
    const errorMessageDiv = document.getElementById('winning-numbers-and-bonus-number-error-message');

    try {
      const winningNumberInputs = document.querySelectorAll('.winning-number-input');
      const winningNumbers = [...winningNumberInputs].map((input) => input.value);
      winningNumbers.forEach((number) => validateWinningNumber(number));

      winningNumbersAndBonusNumberFormStore.setState({ isValidWinningNumbers: true });
      const { isValidBonusNumber } = winningNumbersAndBonusNumberFormStore.getState();
      if (isValidBonusNumber) {
        submitButton.disabled = false;
      }
      errorMessageDiv.innerText = '';
    } catch (e) {
      winningNumbersAndBonusNumberFormStore.setState({ isValidWinningNumbers: false });
      submitButton.disabled = true;
      errorMessageDiv.innerText = e.message;
    }
  },

  handleBonusNumberInput(e) {
    const submitButton = document.getElementById('result-check-button');
    const errorMessageDiv = document.getElementById('winning-numbers-and-bonus-number-error-message');

    try {
      const bonusNumber = e.target.value;
      validateBonusNumber(bonusNumber);

      winningNumbersAndBonusNumberFormStore.setState({ isValidBonusNumber: true });
      const { isValidWinningNumbers } = winningNumbersAndBonusNumberFormStore.getState();
      if (isValidWinningNumbers) {
        submitButton.disabled = false;
      }
      errorMessageDiv.innerText = '';
    } catch (e) {
      winningNumbersAndBonusNumberFormStore.setState({ isValidBonusNumber: false });
      submitButton.disabled = true;
      errorMessageDiv.innerText = e.message;
    }
  },

  init() {
    const winningLottoAndBonusNumberForm = document.getElementById('winning-lotto-and-bonus-number-form');
    if (winningLottoAndBonusNumberForm) {
      winningLottoAndBonusNumberForm.remove();
    }
  },
};

export default WinningNumbersAndBonusNumberForm;
