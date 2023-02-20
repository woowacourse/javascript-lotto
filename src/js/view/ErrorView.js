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

  #getErrorElement(message) {
    return `
      <img class="error-icon" class="error-icon" src="./src/images/error_icon.png" />
      <span class="error-message">${message}</span>
    `;
  }
}

export default ErrorView;
