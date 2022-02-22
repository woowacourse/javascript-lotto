export const $ = (parentElement, childSelector = null) => {
  const target = childSelector || parentElement;
  const $parent = childSelector ? parentElement : document.getElementById('app');

  return $parent.querySelector(target);
};

export const $$ = (parentElement, childSelector = null) => {
  const target = childSelector || parentElement;
  const $parent = childSelector ? parentElement : document.getElementById('app');

  return $parent.querySelectorAll(target);
};
