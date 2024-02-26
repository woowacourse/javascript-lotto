import { COMPONENT_SELECTOR } from '../../constants/webApplication';
import { $ } from './dom';

const createErrorMessage = (message) => {
  const paragraphElement = document.createElement('p');
  const textElement = document.createTextNode(message);

  paragraphElement.classList.add('error-message');
  paragraphElement.appendChild(textElement);

  return paragraphElement;
};

const commitNewErrorMessage = (message, targetElement) => {
  const errorMessageElement = createErrorMessage(message);

  targetElement.appendChild(errorMessageElement);
};

const updateErrorMessage = (errorMessageElement, message) => {
  errorMessageElement.innerHTML = message;
};

export const showErrorMessage = (message, targetElement) => {
  const errorMessageElement = $(COMPONENT_SELECTOR.errorMessage, targetElement);

  if (errorMessageElement) {
    updateErrorMessage(errorMessageElement, message);
    return;
  }

  commitNewErrorMessage(message, targetElement);
};

export const removeErrorMessage = (targetElement) => {
  const errorMessageElement = $(COMPONENT_SELECTOR.errorMessage, targetElement);

  if (errorMessageElement) errorMessageElement.remove();
};
