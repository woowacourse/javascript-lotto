import { DOM } from './DOM/dom.js';
import { handleBonusNumberInput, handlePurchaseSubmit, handleWinningNumberInput } from './view/web/inputHandler.js';
import { handleRestartButtonClick, handleResultButtonClick } from './view/web/buttonHandler.js';
import { handleModalCloseClick } from './view/web/uiHandler.js';

DOM.purchaseForm.addEventListener('submit', handlePurchaseSubmit);

DOM.winningInputs.forEach((input, index) => {
  input.addEventListener('input', (event) => {
    handleWinningNumberInput(index, event.target.value);
  });
});

DOM.bonusInput.addEventListener('input', (event) => {
  handleBonusNumberInput(event.target.value);
});

document.addEventListener('click', (event) => {
  if (event.target && event.target.id === 'result-button') handleResultButtonClick();

  if (event.target && event.target.classList.contains('modal-close')) handleModalCloseClick();

  if (event.target && event.target.id === 'restart-button') handleRestartButtonClick();
});
