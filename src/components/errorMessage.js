import { errorMessage } from '../view/templates/errorMessage';

export default function showErrorMessage($root, message, $trigger) {
  const $errorMessage = errorMessage({ message });

  $root.insertAdjacentElement('afterend', $errorMessage);
  $trigger.disabled = true;

  setTimeout(() => {
    $root.parentElement.removeChild($errorMessage);
    $trigger.disabled = false;
  }, 3000);
}
