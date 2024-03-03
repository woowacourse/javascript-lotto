export default function removeErrorMessage() {
  const errorTag = document.querySelector('.error-message');
  if (errorTag) {
    errorTag.parentNode.removeChild(errorTag);
  }
}
