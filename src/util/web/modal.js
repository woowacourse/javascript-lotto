import { enableButton } from './buttonState.js';
import { lockScroll, unlockScroll } from './scroll.js';
import { $, $all } from './selector.js';

const showModal = (modal) => {
  modal.style.display = 'flex';
  lockScroll();
};

const closeModal = (modal) => {
  modal.style.display = 'none';
  unlockScroll();
};

const restartGame = (modal) => {
  closeModal(modal);
  resetGameState();
};

const resetGameState = () => {
  $all('form').forEach((form) => form.reset());

  $('.purchase-form__result').innerHTML = '';

  const purchaseButton = $('.purchase-form__button');
  enableButton(purchaseButton);
};

export { showModal, closeModal, restartGame };
