export const generateRandomNumber = (to) => {
  return Math.floor(Math.random() * to) + 1;
};

export const generateUniqueRandomNumbers = (to, length) => {
  const result = new Set();

  while (result.size !== length) {
    const randomNumber = generateRandomNumber(to);
    result.add(randomNumber);
  }

  return Array.from(result);
};
