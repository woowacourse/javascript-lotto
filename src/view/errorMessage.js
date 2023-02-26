export default function showErrorMessage($root, message, $trigger) {
  const $errorMessage = document.createElement('span');
  $errorMessage.className = 'caption warning-span';
  $errorMessage.innerText = message;

  $root.insertAdjacentElement('afterend', $errorMessage);
  $trigger.disabled = true;

  setTimeout(() => {
    $root.parentElement.removeChild($errorMessage);
    $trigger.disabled = false;
  }, 3000);
}
