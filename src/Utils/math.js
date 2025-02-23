export const getRandomNumber = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min);
};
