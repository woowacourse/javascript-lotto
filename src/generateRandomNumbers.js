export const generateRandomNumbers = () => {
  const randomSet = new Set();
  while (randomSet.size < 6) {
    randomSet.add(Math.floor(Math.random() * 45)) + 1;
  }
  return Array.from(randomSet);
};
