export const isDividedByThousand = (purchaseMoney) => {
  return purchaseMoney % 1000 === 0;
};

export const isEmptyValue = (purchaseMoney) => {
  return !purchaseMoney;
};

export const isPositiveValue = (purchaseMoney) => {
  return purchaseMoney > 0;
};

export const isValidPurchaseMoney = (purchaseMoney) => {
  return isDividedByThousand(purchaseMoney) && !isEmptyValue(purchaseMoney) && isPositiveValue(purchaseMoney);
};
