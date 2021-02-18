export const showElement = (element) => {
  return element.classList.remove('d-none');
};

export const hideElement = (element) => {
  return element.classList.add('d-none');
};

export const disabledElement = (element) => {
  return element.setAttribute('disabled', true);
};

export const enabledElement = (element) => {
  return element.removeAttribute('disabled');
};
