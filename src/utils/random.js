// TODO: 로직 및 변수명 벼
export const getUniqueRandomNumbers = ({ min, max }, count) => {
  const randomNumberArray = new Set();

  while (randomNumberArray.size < count) {
    const number = getRandomNumber(min, max);
    if (!randomNumberArray.has(number)) {
      randomNumberArray.add(number);
    }
  }
  return [...randomNumberArray];
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
