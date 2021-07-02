export const $ = (selector, $target = document) => $target.querySelector(selector);
export const $all = (selector, $target = document) => [...$target.querySelectorAll(selector)];

export const createElement = (tagName, className, text = '') => {
  const $element = document.createElement(tagName);
  $element.className = className;
  $element.append(text);
  return $element;
};

export const getRandomNumberArray = (min, max, length) => {
  const numberArray = [];

  while (numberArray.length < length) {
    const number = Math.floor(Math.random() * (max - min + 1) + min);

    if (numberArray.includes(number)) continue;
    numberArray.push(number);
  }

  return numberArray;
};

export const getDuplicatedValueIndex = (array) => {
  const tempArray = [];

  for (let idx = 0; idx < array.length; idx++) {
    if (tempArray.includes(array[idx])) {
      return idx;
    }
    tempArray.push(array[idx]);
  }

  return -1;
};

export const showElement = ($element) => {
  $element.classList.remove('d-none');
};

export const hideElement = ($element) => {
  $element.classList.add('d-none');
};

export const enableElement = ($element) => {
  $element.disabled = false;
};

export const disableElement = ($element) => {
  $element.disabled = true;
};

export const getMatchCount = (array1, array2) => {
  const set = new Set([...array1, ...array2]);
  return array1.length + array2.length - set.size;
};
