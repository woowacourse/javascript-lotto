export const generateRandomNumber = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

export const generateUniqueRandomNumbers = (max, length) => {
  const result = new Set();

  while (result.size !== length) {
    const randomNumber = generateRandomNumber(max);
    result.add(randomNumber);
  }

  return Array.from(result);
};
