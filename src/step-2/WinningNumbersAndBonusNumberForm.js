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
    const winningNumbersInput = document.createElement('input');
    const bonusNumberInput = document.createElement('input');
    const resultCheckButton = document.createElement('button');

    winningLottoAndBonusNumberForm.id = 'winning-lotto-and-bonus-number-form';
    winningLottoAndBonusNumberForm.addEventListener('submit', this.handleSubmit);

    winningNumbersInput.id = 'winning-numbers-input';
    winningNumbersInput.type = 'number';
    winningNumbersInput.name = 'winningNumbers';

    bonusNumberInput.id = 'bonus-number-input';
    bonusNumberInput.type = 'number';
    bonusNumberInput.name = 'bonusNumber';

    resultCheckButton.id = 'result-check-button';
    resultCheckButton.type = 'submit';
    resultCheckButton.innerText = '결과 확인하기';

    winningLottoAndBonusNumberForm.appendChild(winningNumbersInput);
    winningLottoAndBonusNumberForm.appendChild(bonusNumberInput);
    winningLottoAndBonusNumberForm.appendChild(resultCheckButton);

    container.appendChild(winningLottoAndBonusNumberForm);
  },

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { winningNumbers, bonusNumber } = Object.fromEntries(formData.entries());
    const winningLottoAndBonusNumber = new WinningLottoAndBonusNumber(new Lotto(winningNumbers), bonusNumber);
    winningLottoAndBonusNumberStore.setState({ winningLottoAndBonusNumber });
  },
};

export default WinningNumbersAndBonusNumberForm;
