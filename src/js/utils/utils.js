export const selectDom = (selector, parent = document) => parent.querySelector(selector);

export const isNumberInRange = ({ number, min, max }) => number >= min && number <= max;
export const isNumberArray = (numberArray) =>
  !!numberArray.length && numberArray.every((number) => !!number);
export const isAllNumbersUnique = (numberArray) => numberArray.length === new Set(numberArray).size;

export const generateRandomNumberInRange = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

export const createElementWithClassName = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

export const initInputElement = (inputElement) => {
  inputElement.value = '';
};

export const convertStringNumberArrayToNumberArray = (stringNumberArray) =>
  stringNumberArray.map((string) => Number(string.trim()));

export const handleOnInput = (input, maxlength) => {
  if (input.value.length >= maxlength) {
    input.value = input.value.substr(0, maxlength - 1);
  }
};
