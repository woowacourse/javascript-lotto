export const randomNumberBetween = (min = 1, max = 45) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
