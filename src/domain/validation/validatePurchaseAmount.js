const validatePurchaseAmount = (input) => {
  const purchaseAmount = Number(input);

  if (Number.isNaN(purchaseAmount)) {
    throw new Error();
  }
  if (purchaseAmount < 1_000) {
    throw new Error();
  }
  if (purchaseAmount % 1_000 !== 0) {
    throw new Error();
  }
  if (purchaseAmount > 100_000) {
    throw new Error();
  }
};

export default validatePurchaseAmount;
