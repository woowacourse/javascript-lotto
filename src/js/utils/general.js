export const getRandomNumber = ({ min, max }) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRateOfReturn = (profit, loss) => ((profit - loss) / loss) * 100;

export const hasElementOutOfRange = (list, { min, max }) => {
  return list.some((element) => element < min || element > max);
};

export const hasDuplicatedElement = (list) => {
  return new Set(list).size !== list.length;
};

export const isShortLength = (list, expectedLength) => {
  return list.length < expectedLength;
};

export const getNthElementUpdated = (array, index, newContent) => {
  return array
    .slice(0, index)
    .concat(newContent)
    .concat(array.slice(index + 1));
};

export const getNthElementRemoved = (array, index) => {
  return array.slice(0, index).concat(array.slice(index + 1));
};

export const getElementRemoved = (array, element) => {
  const index = this.numbers.indexOf(element);

  return array.slice(0, index).concat(array.slice(index + 1));
};
