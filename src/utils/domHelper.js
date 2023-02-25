/* eslint-disable no-undef */
export const qs = (selector, target = document) => target.querySelector(selector);
export const qsAll = (selector, target = document) => target.querySelectorAll(selector);
export const getId = (selector, target = document) => target.getElementById(selector);
