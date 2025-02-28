const resetError = (inputElement, errorElement) => {
  errorElement.textContent = '';
  errorElement.style.visibility = 'hidden';
  inputElement.classList.remove('error');
};

export { resetError };
