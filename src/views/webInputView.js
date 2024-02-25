import purchaseAmountValidator from '../validators/purchaseAmountValidator.js';
import winningNumbersValidator from '../validators/winningNumbersValidator.js';
import bonusNumberValidator from '../validators/bonusNumberValidator.js';

const $purchaseError = document.getElementById('purchaseError');
const $winningNumberSection = document.getElementById('winningNumberSection');

const webInputView = {
  readPurchaseAmount() {
    try {
      const purchaseAmountInput = document.getElementById('purchaseInput').value;
      const purchaseAmount = purchaseAmountInput.trim();
      purchaseAmountValidator.validate(purchaseAmount);
      $purchaseError.classList.add('hidden');
      $winningNumberSection.classList.remove('hidden');
      return purchaseAmount;
    } catch (error) {
      $purchaseError.textContent = error.message;
      $purchaseError.classList.remove('hidden');
      return false;
    }
  },

  readWinningNumbers() {
    try {
      const winningNumbersInput = [...document.querySelectorAll('#winningNumberInput')];
      const winningNumbers = winningNumbersInput.map(data => parseInt(data.value, 10));
      winningNumbersValidator.validate(winningNumbers);
      return winningNumbers;
    } catch (error) {
      return false;
    }
  },

  readBonusNumber(winningNumbers) {
    try {
      const bonusNumberInput = document.getElementById('bonusNumberInput').value;
      const bonusNumber = parseInt(bonusNumberInput, 10);
      bonusNumberValidator.validate(bonusNumber, winningNumbers);
      return bonusNumber;
    } catch (error) {
      return false;
    }
  },
};

export default webInputView;
