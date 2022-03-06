import { LOTTO } from '../configs/contants';

/**
 * Common Utils
 */

export const generateNumberArray = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
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

const isObject = (object) => object != null && typeof object === 'object';

export function isEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) return false;

  return !keys1.some((key) => {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);

    return (
      (areObjects && !isEqual(val1, val2)) || (!areObjects && val1 !== val2)
    );
  });
}

export const getEmptyCount = (keys) => {
  const count = {};

  keys.forEach((key) => {
    if (key) count[key] = 0;
  });

  return count;
};

export const concatWinningNumbers = (winningNumbers) => [
  ...winningNumbers.main,
  winningNumbers.bonus,
];

export const removeNaN = (str) =>
  str.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

export const ignoreFirstZero = (str) => {
  return str[0] === '0' ? '' : str;
};

/**
 * Math Utils
 */

export const ascendingOrder = (a, b) => a - b;

export const prizeAmountAscendingOrder = (a, b) =>
  ascendingOrder(LOTTO.PRIZE[a[0]].AMOUNT, LOTTO.PRIZE[b[0]].AMOUNT);

export const getRandomInt = (min, max) => {
  const ceiledMin = Math.ceil(min);
  const flooredMax = Math.floor(max);

  return Math.floor(Math.random() * (flooredMax - ceiledMin)) + ceiledMin;
};

export const calculateRateOfReturn = (currentValue, initialValue) =>
  (currentValue - initialValue) / initialValue;

/**
 * Dom Utils
 */

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

export const $all = (selector, type = null) => {
  return document.querySelectorAll(addPrefix(selector, type));
};

export const isInputOutOfRange = (target, max) => {
  const maxString = max.toString(10);

  return (
    target.value.length >= maxString.length ||
    parseInt(target.value[0], 10) > maxString[0]
  );
};

export const getNextSibling = (target, { attributeName, attributeType }) => {
  const siblings = $all(attributeName, attributeType);

  return siblings[[...siblings].indexOf(target) + 1];
};

export const getPrevSibling = (target, { attributeName, attributeType }) => {
  const siblings = $all(attributeName, attributeType);

  return siblings[[...siblings].indexOf(target) - 1];
};
