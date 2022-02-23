import { ERROR_MESSAGE, RULES } from '../constants';

const isZero = money => {
  return money === 0;
};

const isNotNumber = money => {
  return Number.isNaN(money) || typeof money !== 'number';
};

const isNotUnitOfThousand = purchaseMoney => {
  return (
    purchaseMoney % RULES.LOTTO_PRICE !== 0 || purchaseMoney < RULES.LOTTO_PRICE
  );
};

const invalidPurchaseMoney = purchaseMoney => {
  if (isZero(purchaseMoney)) {
    throw new Error(ERROR_MESSAGE.ZERO_MONEY);
  }

  if (isNotNumber(purchaseMoney)) {
    throw new Error(ERROR_MESSAGE.NOT_NUMBER_TYPE);
  }

  if (isNotUnitOfThousand(purchaseMoney)) {
    throw new Error(ERROR_MESSAGE.NOT_UNIT_OF_THOUSAND);
  }
};

export { invalidPurchaseMoney };
