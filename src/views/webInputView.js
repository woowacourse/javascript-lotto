import purchaseAmountValidator from '../validators/purchaseAmountValidator.js';
import winningNumbersValidator from '../validators/winningNumbersValidator.js';
import bonusNumberValidator from '../validators/bonusNumberValidator.js';

const webInputView = {
  $purchaseError: document.getElementById('purchaseError'),
  $winningNumberSection: document.getElementById('winningNumberSection'),

  readPurchaseAmount() {
    try {
      const purchaseAmountInput = document.getElementById('purchaseInput').value;
      const purchaseAmount = purchaseAmountInput.trim();
      purchaseAmountValidator.validate(purchaseAmount);
      this.$purchaseError.classList.add('hidden');
      this.$winningNumberSection.classList.remove('hidden');
      return purchaseAmount;
    } catch (error) {
      this.$purchaseError.textContent = error.message;
      this.$purchaseError.classList.remove('hidden');
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
