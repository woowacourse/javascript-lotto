import { submitPurchaseForm } from './js/submitPurchaseForm.js';
import { submitWinningNumberForm } from './js/submitWinningNumberForm.js';
document.addEventListener('DOMContentLoaded', async () => {
  const lottoArray = await submitPurchaseForm();
  console.log(lottoArray);
  submitWinningNumberForm(lottoArray);
});
