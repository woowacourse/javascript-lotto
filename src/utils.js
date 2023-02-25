export const getIntersectionLengthOf = (...arrays) => {
  return arrays.reduce((acc, cur) => {
    return acc.filter((x) => cur.includes(x));
  }).length;
};

export const randomNumberBetween = (min = 1, max = 45) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getAscendingSortedNumbers = (numbers) => {
  return numbers.sort((a, b) => a - b);
};
