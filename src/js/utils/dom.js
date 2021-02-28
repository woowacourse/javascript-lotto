export const $ = selector => document.querySelector(selector);
export const $$ = selector => Array.from(document.querySelectorAll(selector));

export const clearInputValue = $input => {
  $input.value = '';
};

export const disableElements = (...$elements) => {
  $elements.forEach($elem => {
    $elem.disabled = true;
  });
};

export const enableElements = (...$elements) => {
  $elements.forEach($elem => {
    $elem.disabled = false;
  });
};

export const removeClassNames = ($target, ...names) => {
  names.forEach(className => {
    if (!$target.classList.contains(className)) {
      return;
    }
    $target.classList.remove(className);
  });
};

export const addClassNames = ($target, ...names) => {
  names.forEach(className => {
    if ($target.classList.contains(className)) {
      return;
    }

    $target.classList.add(className);
  });
};
