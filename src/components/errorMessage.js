export default function showErrorMessage($root, message, $trigger) {
  const $errorSpan = document.createElement('span');
  $errorSpan.className = 'caption warning-span';
  $errorSpan.innerText = message;

  $root.insertAdjacentElement('afterend', $errorSpan);
  $trigger.disabled = true;

  setTimeout(() => {
    $root.parentElement.removeChild($errorSpan);
    $trigger.disabled = false;
  }, 3000);
}
