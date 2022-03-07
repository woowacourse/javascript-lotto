const isNumberString = (value) => /^[0-9]*$/g.test(value);

const isPositiveInteger = (value) => isNumberString(value) && value > 0;

const isDivisible = (value, number) => value % number === 0;

const isNumberRange = (value, minNumber, maxNumber) => value >= minNumber && value <= maxNumber;

const hasEmptyString = (list) => list.some((value) => value === '');

const hasOutRangeNumber = (list, minNumber, maxNumber) =>
  list.some((value) => value < minNumber || value > maxNumber);

const isDiffArrayLength = (list, count) => list.length !== count;

const hasDuplicateItem = (list) => list.length !== new Set(list).size;

const getDuplicateIndex = (list) =>
  list.reduce((previous, current, index, origin) => {
    if (origin.indexOf(current) !== index && origin.includes(current) === true) {
      previous.push(index);
    }
    return previous;
  }, []);

export {
  isNumberString,
  isPositiveInteger,
  isDivisible,
  isNumberRange,
  hasEmptyString,
  hasOutRangeNumber,
  isDiffArrayLength,
  hasDuplicateItem,
  getDuplicateIndex,
};
