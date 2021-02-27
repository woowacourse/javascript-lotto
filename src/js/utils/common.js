export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isEmptyValue = value => value === '';

export const isInRange = (value, min = 1, max = 45) => {
  return min <= value && value <= max;
};

export const getMatchedCount = (arr1, arr2) => {
  let count = 0;
  arr2.forEach(number => {
    if (arr1.includes(number)) count++;
  });
  return count;
};
