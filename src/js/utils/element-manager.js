import { SELECTOR } from '../constants/selector.js';

export const $ = (parentElement, childSelector = null) => {
  const target = childSelector || parentElement;
  const $parent = childSelector ? parentElement : document.getElementById(SELECTOR.ID.APP);

  return $parent.querySelector(target);
};

export const $$ = (parentElement, childSelector = null) => {
  const target = childSelector || parentElement;
  const $parent = childSelector ? parentElement : document.getElementById(SELECTOR.ID.APP);

  return $parent.querySelectorAll(target);
};
