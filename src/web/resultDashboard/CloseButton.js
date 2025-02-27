import { createElement } from '../utils/dom';

export default function CloseButton(resultDashboard, resultBackground) {
  const closeButton = createElement('button', { textContent: 'X', class: 'close-button' });
  closeButton.addEventListener('click', () => {
    resultBackground.remove();
    resultDashboard.remove();
  });

  resultDashboard.appendChild(closeButton);
}
