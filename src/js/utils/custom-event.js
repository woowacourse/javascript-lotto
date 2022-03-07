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

export const onEnableButton = ($eventTarget, condition) => {
  if ($eventTarget instanceof HTMLElement === false) {
    return;
  }

  if (condition($eventTarget) === false) {
    $eventTarget.disabled = true;
    return;
  }

  $eventTarget.disabled = false;
};

export const addEventOnce = (eventType, $element, callback) => {
  if ($element instanceof HTMLElement === false) {
    return;
  }

  $element.addEventListener(eventType, callback, {
    once: true,
  });
};
