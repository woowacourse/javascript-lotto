import { userLottoStore, winningLottoAndBonusNumberStore } from './stores.js';
import WinningLottoAndBonusNumber from '../step-1/WinningLottoAndBonusNumber.js';
import Lotto from '../step-1/Lotto.js';

const WinningNumbersAndBonusNumberForm = {
  render(container) {
    if (!userLottoStore.hasTrigger('winning-numbers-and-bonus-number')) {
      userLottoStore.appendTrigger(
        'winning-numbers-and-bonus-number', () => this.render(container),
      );
    }

    if (!userLottoStore.getState().purchaseAmount) return;

    const winningLottoAndBonusNumberForm = document.createElement('form');
    const winningNumberInputs = Array.from({ length: 6 }).map(() => document.createElement('input'));
    const bonusNumberInput = document.createElement('input');
    const resultCheckButton = document.createElement('button');

    winningLottoAndBonusNumberForm.id = 'winning-lotto-and-bonus-number-form';
    winningLottoAndBonusNumberForm.addEventListener('submit', this.handleSubmit);

    winningNumberInputs.forEach((input, i) => {
      input.id = `winning-number-input-${i + 1}`;
      input.className = 'winning-number-input';
      input.type = 'number';
      input.name = `winningNumber${i + 1}`;
    });

    bonusNumberInput.id = 'bonus-number-input';
    bonusNumberInput.type = 'number';
    bonusNumberInput.name = 'bonusNumber';

    resultCheckButton.id = 'result-check-button';
    resultCheckButton.type = 'submit';
    resultCheckButton.innerText = '결과 확인하기';

    winningNumberInputs.forEach((input) => winningLottoAndBonusNumberForm.appendChild(input));
    winningLottoAndBonusNumberForm.appendChild(bonusNumberInput);
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
    console.log(winningLottoAndBonusNumber);
  },
};

export default WinningNumbersAndBonusNumberForm;
