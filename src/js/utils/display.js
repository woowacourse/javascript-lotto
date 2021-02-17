const HIDDEN = "--hidden";

export const show = ($element) => {
  $element.classList.remove(HIDDEN);
};

export const hide = ($element) => {
  $element.classList.add(HIDDEN);
};
