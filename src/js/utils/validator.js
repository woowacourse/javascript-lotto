import { ERROR_MESSAGE } from "./constants.js";

export const isDividedByThousand = (purchaseMoney) => {
  if (purchaseMoney % 1000 !== 0) {
    throw ERROR_MESSAGE.NOT_VALIDE_UNIT_PURCHASE_MONEY;
  }
};

export const isEmptyValue = (purchaseMoney) => {
  if (!purchaseMoney) {
    throw ERROR_MESSAGE.EMPTY_PURCHASE_MONEY;
  }
};

export const isPositiveValue = (purchaseMoney) => {
  if (purchaseMoney <= 0) {
    throw ERROR_MESSAGE.NOT_VALID_PURCHASE_MONEY;
  }
};

export const isMaxPurchaseLotto = (purchaseMoney) => {
  if (purchaseMoney > 5000) {
    throw ERROR_MESSAGE.MORE_THAN_MAX_COST;
  }
}
