export const show = (...elements) =>
  elements.forEach(element => element.classList.remove('d-none'));

export const hide = (...elements) =>
  elements.forEach(element => element.classList.add('d-none'));
