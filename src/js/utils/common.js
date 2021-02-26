export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const divide = (a, b) => {
  return Math.floor(a / b);
};

export const mod = (a, b) => {
  return a % b;
};

export const sortNumbers = numbers => {
  const result = [...numbers];
  return result.sort((a, b) => a - b);
};

export const isEmptyValue = value => value === '';

export const isInRange = (value, min = 1, max = 45) => {
  return min <= value && value <= max;
};
