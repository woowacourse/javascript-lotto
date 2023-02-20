class ErrorView {
  #errorAreaElement;
  #focusElement;

  #getErrorElement(message) {
    return `
      <img class="error-icon" class="error-icon" src="./src/images/error_icon.png" />
      <span class="error-message">${message}</span>
    `;
  }
}

export default ErrorView;
