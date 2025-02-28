import { createElement } from '../utils/dom';

export default function CloseButton(resultDashboard, resultBackground) {
  const closeButton = createElement('button', { textContent: 'X', class: 'close-button' });

  const closeModal = () => {
    resultBackground.remove();
    resultDashboard.remove();
    document.removeEventListener('keydown', handleEscapeKey);
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  closeButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', handleEscapeKey);

  resultDashboard.appendChild(closeButton);
}
