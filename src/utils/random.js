export const getRandomNumber = (min, max) => {
  if (Number.isNaN(min) && Number.isNaN(max)) return;
  
  return Math.floor(Math.random() * max + min);
};
