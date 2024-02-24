const createErrorMessage = (message) => {
  const paragraphElement = document.createElement('p');
  const textElement = document.createTextNode(message);

  paragraphElement.classList.add('error-message');
  paragraphElement.appendChild(textElement);

  return paragraphElement;
};

const commitNewErrorMessage = (message, targetSelector) => {
  const errorMessageElement = createErrorMessage(message);

  document.querySelector(targetSelector).appendChild(errorMessageElement);
};

const updateErrorMessage = (errorMessageElement, message) => {
  errorMessageElement.innerHTML = message;
};

export const showErrorMessage = (message, targetElement) => {
  const errorMessageElement = document.querySelector('.error-message');

  if (errorMessageElement) {
    updateErrorMessage(errorMessageElement, message);
    return;
  }

  commitNewErrorMessage(message, targetElement);
};
