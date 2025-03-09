import { $ } from '../util/web/selector.js';
import { closeModal, restartGame } from '../util/web/modal.js';

const setupModalControl = () => {
  const modal = $('.modal');
  const closeButton = $('.modal__close-button');
  const restartButton = $('.modal__restart-button');

  closeButton.addEventListener('click', () => closeModal(modal));
  restartButton.addEventListener('click', () => restartGame(modal));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal(modal);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal(modal);
  });
};

export default setupModalControl;
