import { STYLE_SELECTORS } from "../constants/constants.js";

export const hideElement = (el) => {
  el.classList.add(STYLE_SELECTORS.hidden);
};

export const renderElement = (el) => {
  el.classList.remove(STYLE_SELECTORS.hidden);
};

export const $ = (selector, target = document) => {
  return target.querySelector(selector);
};

export const $$ = (selector, target = document) => {
  return target.querySelectorAll(selector);
};

export const eventOn = ({ target, eventType }, eventListener) => {
  target.addEventListener(eventType, eventListener);
};

export const eventOff = ({ target, eventType }, eventListener) => {
  target.removeEventListener(eventType, eventListener);
};
