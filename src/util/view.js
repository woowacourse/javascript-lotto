import { ERROR_MESSAGE } from '../constants/message';

export const renderError = (el, errorMessage) => {
  el.innerHTML = errorMessage.slice(ERROR_MESSAGE.PREFIX.length + 1);
  renderElement(el);
};

export const hideElement = (el) => {
  el.classList.add('hidden');
};

export const renderElement = (el) => {
  el.classList.remove('hidden');
};
