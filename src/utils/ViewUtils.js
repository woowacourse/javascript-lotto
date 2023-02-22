import { $ } from './DomSelector';

const ViewUtils = {
  showError(element, message) {
    element.classList.add('error-input');
    this.showErrorMessage(element.classList[0], message);
  },

  hideError(event) {
    event.target.classList.remove('error-input');
    this.hideErrorMessage(event.target.classList[0]);
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
    element.focus();
  },

  resetForm(element) {
    element.reset();
  },

  resetInnerHTML(element) {
    element.innerHTML = '';
  }
};

export default ViewUtils;