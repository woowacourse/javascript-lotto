export default function findErrorAndRemove() {
  const errorTag = document.querySelector('.error-message');
  if (errorTag) {
    errorTag.parentNode.removeChild(errorTag);
  }
}
