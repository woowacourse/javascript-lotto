export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isEmptyValue = value => value === '';

export const isInNumberInterval = (value, min, max) => {
  if (min && max) return min <= value && value <= max;
  return new Error('숫자의 범위가 입력되지 않았습니다.');
};
