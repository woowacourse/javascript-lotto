const pickNumberInRange = (minRange, maxRange) => {
  return Math.floor(Math.random() * (maxRange + 1 - minRange)) + minRange;
};

export default pickNumberInRange;
