const getQuotient = (target, divider) => {
  return parseInt(target / divider, 10);
};

const roundOff = value => {
  return Math.round(value * 10) / 10;
};

export { getQuotient, roundOff };
