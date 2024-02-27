export const renderError = (el, errorMessage) => {
  el.innerHTML = errorMessage;
  renderElement(el);
};

export const hideElement = (el) => {
  el.classList.add('hidden');
};

export const renderElement = (el) => {
  el.classList.remove('hidden');
};
