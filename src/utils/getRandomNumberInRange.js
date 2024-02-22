export const getRandomNumberInRange = (start, end) => {
  return start + Math.round(Math.random() * (end - start));
};

export default getRandomNumberInRange;
