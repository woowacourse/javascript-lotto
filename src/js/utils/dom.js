export const $ = (select) => document.querySelector(select);

export const $$ = (select) => document.querySelectorAll(select);

export const setDisabled = (element) => element.setAttribute("disabled", true);
