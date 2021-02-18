export const showElement = (element) => {
  element.classList.remove('d-none');
};

export const hideElement = (element) => {
  element.classList.add('d-none');
};

export const disabledElement = (element) => {
  element.setAttribute('disabled', true);
};

export const enabledElement = (element) => {
  element.removeAttribute('disabled');
};
