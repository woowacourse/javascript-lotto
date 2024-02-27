import purchaseAmountValidator from '../validators/purchaseAmountValidator.js';
import winningNumbersValidator from '../validators/winningNumbersValidator.js';
import bonusNumberValidator from '../validators/bonusNumberValidator.js';

const webInputView = {
  $purchaseError: document.getElementById('purchaseError'),
  $winningNumberSection: document.getElementById('winningNumberSection'),
  $lottoNumberError: document.getElementById('lottoNumberError'),

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
    try {
      const winningNumbersInput = [...document.querySelectorAll('.winningNumberInput')];
      const winningNumbers = winningNumbersInput.map(data => parseInt(data.value, 10));
      winningNumbersValidator.validate(winningNumbers);
      this.$lottoNumberError.classList.add('hidden');
      return winningNumbers;
    } catch (error) {
      this.$lottoNumberError.textContent = error.message;
      this.$lottoNumberError.classList.remove('hidden');
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
      this.$lottoNumberError.textContent = error.message;
      this.$lottoNumberError.classList.remove('hidden');
      return false;
    }
  },
};

export default webInputView;
