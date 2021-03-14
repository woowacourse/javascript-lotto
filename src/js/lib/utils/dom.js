const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const disableForm = $target => {
  for (const $element of $target.elements) {
    $element.disabled = true;
  }
};

const enableForm = $target => {
  for (const $element of $target.elements) {
    $element.disabled = false;
  }
};

export { $, $$, disableForm, enableForm };
