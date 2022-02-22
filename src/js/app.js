export const isPositiveInteger = (payment) => {
  if (!Number.isInteger(payment) || payment <= 0) {
    throw new Error('');
  }

  return true;
};

export const isDivisibleBy = (payment, quotient) => {
  if (payment % quotient !== 0) {
    throw new Error('error');
  }

  return parseInt(payment / quotient);
};
