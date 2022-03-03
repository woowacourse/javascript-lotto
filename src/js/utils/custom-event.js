export const onInputAutoFocus = ($currentTarget, $nextTarget, condition) => {
  if (
    $currentTarget instanceof HTMLElement === false ||
    $nextTarget instanceof HTMLElement === false
  ) {
    return;
  }

  if (condition($currentTarget, $nextTarget) === false) {
    return;
  }

  $nextTarget.focus();
};

export const onEnableButton = ($target, condition) => {
  if ($target instanceof HTMLElement === false) {
    return;
  }

  if (condition($target) === false) {
    $target.disabled = true;
    return;
  }

  $target.disabled = false;
};
