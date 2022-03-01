export const ascendingOrder = (a, b) => a - b;

export const getRandomInt = (min, max) => {
  const ceiledMin = Math.ceil(min);
  const flooredMax = Math.floor(max);

  return Math.floor(Math.random() * (flooredMax - ceiledMin)) + ceiledMin;
};

export const generateNumberArray = (start, end) => {
  const array = [];

  for (let i = start; i <= end; i += 1) {
    array.push(i);
  }

  return array;
};

export const addPrefix = (selector, type) => {
  let prefix = '';

  switch (type) {
    case 'id':
      prefix = '#';
      break;
    case 'class':
      prefix = '.';
      break;
    default:
      break;
  }

  return `${prefix}${selector}`;
};

export const $ = (selector, type = null) => {
  return document.querySelector(addPrefix(selector, type));
};

export const cloneObject = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;

  const clone = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    clone[key] =
      typeof obj[key] === 'object' && obj[key] !== null
        ? cloneObject(obj[key])
        : (clone[key] = obj[key]);
  });

  return clone;
};
