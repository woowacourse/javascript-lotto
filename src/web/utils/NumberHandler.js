export const getQuotient = (target, divider) => {
  return parseInt(target / divider, 10);
};

export const roundOff = value => {
  return Math.round(value * 10) / 10;
};
