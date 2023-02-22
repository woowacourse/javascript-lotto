export const resetElement = (element) => {
  element.innerHTML = '';
};

export const toggleDisableAttribute = (element) => {
  element.disabled = !element.disabled;
};
