export const selectDom = (selector, parent = document) => parent.querySelector(selector);
export const isNumberInRange = ({ number, min, max }) => number >= min && number <= max;
