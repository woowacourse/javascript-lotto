import { $ } from '../util/web/selector.js';
import { closeModal } from '../util/web/modal.js';

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

export default setupModalControl;
