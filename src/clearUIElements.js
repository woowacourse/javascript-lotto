function clearUIElements() {
  const purchasePriceInput = document.getElementById('purchase-price');
  if (purchasePriceInput.value) {
    purchasePriceInput.value = '';
  }

  const purchaseResult = document.querySelector('.purchase-result');
  if (purchaseResult) {
    purchaseResult.remove();
  }

  const lottoInputContainer = document.getElementsByClassName(
    'lotto-input-container',
  );
  if (lottoInputContainer) {
    Array.from(lottoInputContainer).forEach((element) => {
      element.remove();
    });
  }

  const resultButton = document.getElementById('check-result-btn');
  if (resultButton) {
    resultButton.disabled = false;
  }

  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.remove();
  }
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
  }
}

export default clearUIElements;
