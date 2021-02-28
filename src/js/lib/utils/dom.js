import random from './random.js';

export const $ = selector => {
  const elements = document.querySelectorAll(selector);

  return elements.length === 1 ? elements[0] : elements;
};

export const randomColor = () => {
  setInterval(() => {
    const randomColor = 'rgb(0,' + random(0, 200) + ',' + random(0, 255) + ')';
    $('.remains').style.borderColor = randomColor;
  }, 1000);
};
