import amountFormEventHandler from './eventHandler/amountFormEventHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  const amountForm = document.querySelector('.amount-form');

  amountForm.addEventListener('submit', (event) => {
    const purchaseAmount = amountFormEventHandler(event);
  });
});
