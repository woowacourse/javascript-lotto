export const $ = (selector, baseElement = document) => baseElement.querySelector(selector);
export const $$ = (selector, baseElement = document) => baseElement.querySelectorAll(selector);
