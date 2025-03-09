import { $ } from '../../util/web/selector.js';

export const showError = (selector, message) => {
  const errorUI = $(selector);
  if (!errorUI) return;
  errorUI.textContent = message;
  errorUI.style.display = 'block';
};

export const resetError = (selector) => {
  const errorUI = $(selector);
  if (!errorUI) return;
  errorUI.textContent = '';
  errorUI.style.display = 'none';
};
