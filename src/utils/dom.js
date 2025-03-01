export const $ = (selector, parent = document) =>
  parent.querySelector(selector);
export const $$ = (selector, parent = document) =>
  Array.from(parent.querySelectorAll(selector));
