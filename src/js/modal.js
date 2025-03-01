import { $ } from '../util/selector.js';
import { lockScroll, unlockScroll } from './scroll.js';

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
  location.reload();
};

export { showModal, closeModal, restartGame };
