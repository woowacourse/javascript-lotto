import { $ } from './domSelector';

const ErrorMessageUtil = {
  showErrorMessage(message, target) {
    const errorMessageElement = $('.error-text', target);
    if (errorMessageElement) {
      errorMessageElement.textContent = message;
      return;
    }
    const messageElement = `<p class='error-text'>${message}</p>`;
    target.insertAdjacentHTML('beforeend', messageElement);
  },

  removeErrorMessage(target) {
    const errorMessageElement = $('.error-text', target);
    if (errorMessageElement) {
      errorMessageElement.remove();
    }
  },
};

export default ErrorMessageUtil;
