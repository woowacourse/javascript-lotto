import { DOM_NAME } from '../constants/selector';

export const $ = (parentElement, childSelector = null) => {
  const target = childSelector || parentElement;
  const $parent = childSelector ? parentElement : document.getElementById(DOM_NAME.ID.APP);

  return $parent.querySelector(target);
};

export const $$ = (parentElement, childSelector = null) => {
  const target = childSelector || parentElement;
  const $parent = childSelector ? parentElement : document.getElementById(DOM_NAME.ID.APP);

  return $parent.querySelectorAll(target);
};
