export default function changeButtonStatus(identifier) {
  const element = document.querySelector(identifier);
  element.disabled = true;
  element.classList.add('button-disabled');
}
