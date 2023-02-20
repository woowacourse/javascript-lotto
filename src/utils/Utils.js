const convertAscending = (array = []) => array.sort((a, b) => a - b);

const generateRandomNumber = (start, end) => {
  return Math.floor(Math.random() * (end - start) + start);
};

const checkDuplicateNumberInArray = (array, [start, end]) => {
  const randomNumber = generateRandomNumber(start, end);
  if (array.includes(randomNumber))
    return checkDuplicateNumberInArray(array, [start, end]);

  return randomNumber;
};

const deduplicateArray = (length, range = [0, 0]) => {
  const array = [];
  while (array.length < length) {
    const randomNumber = checkDuplicateNumberInArray(array, range);
    array.push(randomNumber);
  }

  return array;
};

const arrayToObjectThatValueZero = (array) => {
  return Object.fromEntries(array.map((key) => [key, 0]));
};

const isNumberInRange = (number, range) => {
  const [start, end] = range;
  return number <= end && number >= start;
};

export {
  convertAscending,
  generateRandomNumber,
  deduplicateArray,
  arrayToObjectThatValueZero,
  isNumberInRange,
};
