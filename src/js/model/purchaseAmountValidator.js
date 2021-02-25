import { LOTTO_PRICE, MONETARY_UNIT, PURCHASE_AMOUNT_ALERT_MESSAGE } from '../constants.js';

export const validatePurchaseAmount = (purchaseAmount) => {
  if (purchaseAmount % MONETARY_UNIT) {
    return {
      isError: true,
      message: PURCHASE_AMOUNT_ALERT_MESSAGE.PURCHASE_AMOUNT_IS_INVALID_MONEY,
    };
  }

  if (purchaseAmount < LOTTO_PRICE) {
    return {
      isError: true,
      message: PURCHASE_AMOUNT_ALERT_MESSAGE.PURCHASE_AMOUNT_IS_TOO_LOW,
    };
  }

  const change = purchaseAmount % LOTTO_PRICE;

  return {
    isError: false,
    message: PURCHASE_AMOUNT_ALERT_MESSAGE.PURCHASE_AMOUNT_HAS_CHANGE(change),
    change,
  };
};
