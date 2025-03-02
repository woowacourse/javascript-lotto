import SELECTORS from '../../constants/Selectors.js';

function clearUIElements() {
  const purchasePriceInput = document.getElementById(
    SELECTORS.INPUT.PURCHASE_PRICE,
  );
  if (purchasePriceInput.value) {
    purchasePriceInput.value = '';
  }

  const purchaseResult = document.getElementById(SELECTORS.RESULT.PURCHASE);
  if (purchaseResult) {
    purchaseResult.remove();
  }

  const lottoInputContainer = document.getElementsByClassName(
    SELECTORS.CONTAINER.LOTTO_INPUT,
  );
  if (lottoInputContainer) {
    Array.from(lottoInputContainer).forEach((element) => {
      element.remove();
    });
  }

  const resultButton = document.getElementById(SELECTORS.BUTTON.RESULT);
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
