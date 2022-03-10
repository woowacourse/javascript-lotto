export const $ = (select) => document.querySelector(select);
export const $$ = (select) => document.querySelectorAll(select);

export const setDisabled = (element) => element.setAttribute("disabled", true);
export const setEnabled = (element) => element.removeAttribute("disabled");

export const setHidden = (element) => element.setAttribute("hidden", true);
export const setShow = (element) => element.removeAttribute("hidden");
