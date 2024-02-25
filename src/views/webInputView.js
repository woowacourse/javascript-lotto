import purchaseAmountValidator from '../validators/purchaseAmountValidator.js';

const $purchaseError = document.getElementById('purchaseError');

const webInputView = {
  readPurchaseAmount() {
    try {
      const purchaseAmountInput = document.getElementById('purchaseInput').value;
      const purchaseAmount = purchaseAmountInput.trim();
      purchaseAmountValidator.validate(purchaseAmount);
      $purchaseError.classList.add('hidden');
      return purchaseAmount;
    } catch (error) {
      $purchaseError.textContent = error.message;
      $purchaseError.classList.remove('hidden');
      return false;
    }
  },
};

export default webInputView;
