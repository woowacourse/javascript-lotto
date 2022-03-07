export const isDividedByThousand = (value) => {
  return value % 1000 === 0;
};

export const isEmptyValue = (value) => {
  return !value;
};

export const isPositiveValue = (value) => {
  return value > 0;
};

export const isNotDuplicateNumberExistInArray = (valueArray) => {
  return new Set(valueArray).size === valueArray.length;
};

export const isNumberInRange = (value, min, max) => {
  return min <= value && value <= max;
};

export const isAllNumberInRange = (valueArray, min, max) => {
  return valueArray.every((value) => isNumberInRange(value, min, max));
};

export const isNotIncludeSameNumber = (valueArray, target) => {
  return !valueArray.includes(target);
};
