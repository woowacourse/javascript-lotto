export const showError = (errorUI, message) => {
  errorUI.textContent = message;
  errorUI.style.display = 'block';
};

export const resetError = (errorUI) => {
  errorUI.textContent = '';
  errorUI.style.display = 'none';
};
