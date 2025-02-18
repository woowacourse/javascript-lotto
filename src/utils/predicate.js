export const isMultipleOf = (number, multiple) => {
  return number % multiple === 0;
};

export const isInRange = (number, min, max) => {
  return number >= min && number <= max;
};

export const isDuplicate = (array) => {
  return new Set(array).size !== array.length;
};

export const hasNotInteger = (array) => {
  return array.some((number) => !Number.isSafeInteger(number));
};
