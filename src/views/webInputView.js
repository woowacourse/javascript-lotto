import purchaseAmountValidator from '../validators/purchaseAmountValidator.js';

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
};

export default webInputView;
