export const selectDom = (selector, parent = document) => parent.querySelector(selector);

export const isNumberInRange = ({ number, min, max }) => number >= min && number <= max;

const shuffleArray = (array) => {
  const newArray = array;
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return array;
};

export const generateRandomNumberInRange = ({ min, max, count }) => {
  const numberArray = shuffleArray([...Array(max - min + 1).keys()]);
  return numberArray.slice(0, count).map((n) => n + min);
};

export const checkInputMaxLength = (e) => {
  const { target: input, data } = e;
  const { value, maxLength } = input;
  if (data === '.') {
    input.value = value.slice(0, -1);
  }

  if (value.length > maxLength) {
    input.value = value.slice(0, maxLength);
  }
  if (value.length === maxLength) {
    input.nextElementSibling?.focus();
  }
};
