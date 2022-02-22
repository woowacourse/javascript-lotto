export const isPositiveInteger = (payment) => {
  if (!Number.isInteger(payment) || payment <= 0) {
    throw new Error('');
  }

  return true;
};

export const isDivisibleBy = (payment, price) => {
  if (payment % price !== 0) {
    throw new Error('error');
  }

  return parseInt(payment / price);
};
