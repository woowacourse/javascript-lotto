import { DOM, $app, $modal } from '../utils/dom.js';
import { toggleButton } from '../core/toggleButton.js';

export const handleClick = function (e) {
  const eventTarget = e.target;

  if (DOM.hasClass(eventTarget, 'onoff-switch')) {
    toggleButton.call(this);
  }
  if (DOM.hasClass(eventTarget, 'check-result-button')) {
  }
  if (DOM.hasClass(eventTarget, 'modal-window-close-button')) {
    closeModal();
  }
  if (DOM.hasClass(eventTarget, 'restart-button')) {
    window.location.reload();
  }
};

const closeModal = () => {
  $modal.remove();
  DOM.toggleClass($app, 'disabled');
};
