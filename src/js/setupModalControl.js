import { $ } from '../util/selector.js';
import { closeModal, restartGame } from './util/modal.js';

const setupModalControl = () => {
  const modal = $('#result-modal');
  const closeButton = $('.close-button');
  const restartButton = $('#restart-button');

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
