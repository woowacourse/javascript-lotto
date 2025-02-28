const resetError = (errorElement) => {
  errorElement.textContent = '';
  errorElement.style.visibility = 'hidden';
};

const showError = (errorElement, message) => {
  errorElement.textContent = message;
  errorElement.style.visibility = 'visible';
};

export { resetError, showError };
