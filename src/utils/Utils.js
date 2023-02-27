export const convertAscending = (array = []) => array.sort((a, b) => a - b);

export const generateRandomNumber = (start, end) => {
  return Math.floor(Math.random() * (end - start) + start);
};

const checkDuplicateNumberInArray = (array, [start, end]) => {
  const randomNumber = generateRandomNumber(start, end);
  if (array.includes(randomNumber))
    return checkDuplicateNumberInArray(array, [start, end]);

  return randomNumber;
};

export const deduplicateArray = (length, range = [0, 0]) => {
  const array = [];
  while (array.length < length) {
    const randomNumber = checkDuplicateNumberInArray(array, range);
    array.push(randomNumber);
  }

  return array;
};

export const arrayToObjectThatValueZero = (array) => {
  return Object.fromEntries(array.map((key) => [key, 0]));
};

export const isNumberInRange = (number, range) => {
  const [start, end] = range;
  return number <= end && number >= start;
};

export const createTextElementAndAppend = (text, parent) => {
  // eslint-disable-next-line no-undef
  const textElement = document.createElement('p');
  textElement.innerHTML = text;
  parent.appendChild(textElement);
};
