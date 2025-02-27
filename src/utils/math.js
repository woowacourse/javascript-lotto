export const getRevenueRate = (revenue, cost) => {
  return (revenue / cost) * 100;
};

export const roundNumber = (number, roundDigits) => {
  const fixedNumber = Number(number.toFixed(roundDigits));
  return fixedNumber;
};
