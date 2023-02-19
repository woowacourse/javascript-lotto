const { ERROR_MESSAGE } = require('../../constant/message');
const { LOTTO } = require('../../constant/setting');

const isLessThanMinimum = (purchaseAmount) => purchaseAmount < LOTTO.UNIT;
const hasChange = (purchaseAmount) => purchaseAmount % LOTTO.UNIT !== 0;

const validatePurchaseAmount = (purchaseAmount) => {
  if (isLessThanMinimum(purchaseAmount)) {
    throw new Error(ERROR_MESSAGE.LESS_THAN_MINIMUM);
  }
  if (hasChange(purchaseAmount)) {
    throw new Error(ERROR_MESSAGE.HAS_CHANGE);
  }
};

module.exports = validatePurchaseAmount;
