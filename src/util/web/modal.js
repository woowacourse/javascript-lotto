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

export { showModal, closeModal };
