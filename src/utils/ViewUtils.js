import { $ } from './DomSelector';

const ViewUtils = {
  showError(element, message) {
    element.classList.add('error-input');
    this.showErrorMessage(element.classList[0], message);
  },

  hideError(element) {
    element.classList.remove('error-input');
    this.hideErrorMessage(element.classList[0]);
  },

  showErrorMessage(name, message) {
    const domElement = $(`#${name}-error`);
    domElement.textContent = message;
    domElement.style.opacity = 1;
  },

  hideErrorMessage(name) {
    const domElement = $(`#${name}-error`);
    domElement.textContent = '';
    domElement.style.opacity = 0;
  },

  resetInput(element) {
    element.value = '';
  },

  resetForm(element) {
    element.reset();
  },

  focusElement(element) {
    element.focus();
  },

  resetInnerHTML(element) {
    element.innerHTML = '';
  }
};

export default ViewUtils;