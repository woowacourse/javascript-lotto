
import random from './random.js';

export const $ = selector => {

  const elements = document.querySelectorAll(selector);

  return elements.length === 1 ? elements[0] : elements;
};

export const disableElements = event => {
  [...event.target.elements].forEach(element => {
    element.disabled = true;
  });
};

export const removeDOM = selectorArray => {
  selectorArray.forEach(selector => {
    $(selector).parentNode.removeChild($(selector));
  });
};

export const resetForm = selectorArray => {
  selectorArray.forEach(selector => {
    $(selector).reset();
  });
};

export const insertAfter = (location, templateToInsert) => {
  location.insertAdjacentHTML('afterend', templateToInsert);
};

export const focusInput = (selector, name) => {
  const elements = $(`${selector}[name=${name}]`);
  elements.length === undefined ? elements.focus() : elements[0].focus();
};

export const randomColor = () => {
  setInterval(() => {
    const randomColor = opacity =>
      'rgba(' +
      random(0, 10) +
      ',' +
      random(100, 200) +
      ',' +
      random(100, 200) +
      ',' +
      opacity +
      ')';
    $('.remains').style.borderColor = randomColor('1');
    $('.remains').style.background = randomColor('0.1');
  }, 1000);
};

