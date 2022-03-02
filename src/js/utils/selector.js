export const $ = (selector, scope = document) => scope.querySelector(selector);

export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
