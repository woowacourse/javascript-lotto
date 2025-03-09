import { $ } from '../../util/web/selector.js';
import { lockScroll, unlockScroll } from './scroll.js';

const showModal = (modal) => {
  modal.style.display = 'flex';
  lockScroll();
};

const closeModal = (modal) => {
  modal.style.display = 'none';
  unlockScroll();
};

const setupModalControl = () => {
  const modal = $('.modal');
  const closeButton = $('.modal__close-button');

  closeButton.addEventListener('click', () => closeModal(modal));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal(modal);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal(modal);
  });
};

export { showModal, closeModal, setupModalControl };
