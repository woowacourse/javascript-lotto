import {
  MAX_AMOUNT,
  MIN_UNIT,
  PURCHASE_AMOUNT_ERROR_MESSAGES,
} from "../constants/constants.js";
import throwIfInvalid from "../utils/throwIfInvalid.js";

const checkIsNumber = (purchaseAmount) => {
  throwIfInvalid(
    Number.isNaN(purchaseAmount),
    PURCHASE_AMOUNT_ERROR_MESSAGES.NOT_A_NUMBER,
  );
};

const checkValidMinValue = (purchaseAmount) => {
  throwIfInvalid(
    purchaseAmount < MIN_UNIT,
    PURCHASE_AMOUNT_ERROR_MESSAGES.BELOW_MINIMUM,
  );
};

const checkValidUnit = (purchaseAmount) => {
  throwIfInvalid(
    purchaseAmount % MIN_UNIT !== 0,
    PURCHASE_AMOUNT_ERROR_MESSAGES.INVALID_UNIT,
  );
};

const checkValidMaxValue = (purchaseAmount) => {
  throwIfInvalid(
    purchaseAmount > MAX_AMOUNT,
    PURCHASE_AMOUNT_ERROR_MESSAGES.ABOVE_MAXIMUM,
  );
};

const validatePurchaseAmount = (input) => {
  const purchaseAmount = Number(input);

  checkIsNumber(purchaseAmount);
  checkValidMinValue(purchaseAmount);
  checkValidUnit(purchaseAmount);
  checkValidMaxValue(purchaseAmount);

  return purchaseAmount;
};

export default validatePurchaseAmount;
