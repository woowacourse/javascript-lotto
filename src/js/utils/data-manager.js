export const getRandomNumber = (minNumber, maxNumber) =>
  Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);

export const getListDuplicateCount = (currentList, compareList) =>
  currentList.filter((value) => compareList.includes(value)).length;

export const arraySum = (array) => array.reduce((previous, current) => previous + current);
