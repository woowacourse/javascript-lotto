import purchaseAmountValidator from '../validators/purchaseAmountValidator.js';
import winningNumbersValidator from '../validators/winningNumbersValidator.js';
import bonusNumberValidator from '../validators/bonusNumberValidator.js';

const webInputView = {
  readPurchaseAmount(purchaseAmountInput, $purchaseError) {
    try {
      const purchaseAmount = purchaseAmountInput.trim();
      purchaseAmountValidator.validate(purchaseAmount);
      $purchaseError.classList.add('hidden');
      return purchaseAmount;
    } catch (error) {
      // eslint-disable-next-line no-param-reassign
      $purchaseError.textContent = error.message;
      $purchaseError.classList.remove('hidden');
      return false;
    }
  },

  readWinningNumbers() {
    const $lottoNumberError = document.getElementById('lottoNumberError');
    try {
      const winningNumbersInput = [...document.querySelectorAll('.winningNumberInput')];
      const winningNumbers = winningNumbersInput.map(data => parseInt(data.value, 10));
      winningNumbersValidator.validate(winningNumbers);
      $lottoNumberError.classList.add('hidden');
      return winningNumbers;
    } catch (error) {
      $lottoNumberError.textContent = error.message;
      $lottoNumberError.classList.remove('hidden');
      return false;
    }
  },

  readBonusNumber(winningNumbers) {
    const $lottoNumberError = document.getElementById('lottoNumberError');
    try {
      const bonusNumberInput = document.getElementById('bonusNumberInput').value;
      const bonusNumber = parseInt(bonusNumberInput, 10);
      bonusNumberValidator.validate(bonusNumber, winningNumbers);
      return bonusNumber;
    } catch (error) {
      $lottoNumberError.textContent = error.message;
      $lottoNumberError.classList.remove('hidden');
      return false;
    }
  },
};

export default webInputView;
