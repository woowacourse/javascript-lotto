export default function onError(selector, msg) {
  const findErrorTag = document.querySelector('.error-message');
  const errorTag = findErrorTag || document.createElement('div');
  errorTag.className = 'error-message';
  errorTag.textContent = msg;
  selector.insertAdjacentElement('afterend', errorTag);
}
