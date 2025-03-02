import { DOM } from '../../DOM/dom.js';

export const disableWinningInputs = () => {
  DOM.bonusInput.disabled = true;
  DOM.bonusInput.style.cursor = 'not-allowed';
  DOM.winningInputs.forEach((input) => {
    input.disabled = true;
    input.style.cursor = 'not-allowed';
  });
};

export const disablePurchaseInputs = () => {
  DOM.purchaseButton.disabled = true;
  DOM.purchaseButton.style.cursor = 'not-allowed';
  DOM.purchaseInput.disabled = true;
  DOM.purchaseInput.style.cursor = 'not-allowed';
};

export const handleModalCloseClick = () => {
  DOM.modal.style.display = 'none';
  document.body.style.overflow = '';
};

export const showModal = () => {
  DOM.modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};
