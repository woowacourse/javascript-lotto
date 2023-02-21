import errorIcon from '../../images/error_icon.png';

class ErrorView {
  #errorAreaElement;
  #focusElement;

  constructor(errorAreaElement, focusElement) {
    this.#errorAreaElement = errorAreaElement;
    this.#focusElement = focusElement;
  }

  renderErrorMessage(message) {
    this.#errorAreaElement.innerHTML = this.#getErrorElement(message);
    this.#focusElement.select();
  }

  hideErrorMessage() {
    this.#errorAreaElement.innerHTML = '';
  }

  #getErrorElement(message) {
    return `
      <img class="error-icon" class="error-icon" src="${errorIcon}" />
      <span class="error-message">${message}</span>
    `;
  }
}

export default ErrorView;
