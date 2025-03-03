import SELECTORS from './constants/Selectors.js';
import handlePurchase from './handlers/handlePurchase.js';
import handleResult from './handlers/handleResult.js';

document.addEventListener('DOMContentLoaded', () => {
  const purchaseButton = document.getElementById(SELECTORS.BUTTON.PURCHASE);

  purchaseButton.addEventListener('click', async (event) => {
    event.preventDefault();
    await handlePurchase();
    const resultButton = document.getElementById(SELECTORS.BUTTON.RESULT);
    resultButton.addEventListener('click', handleResult);
  });
});
