import { AlertMessage, StandardNumber } from "./constants.js";

export const isValidMoney = (money) => {
  if (isInValidNumber(money)) {
    alert(AlertMessage.INVALID_NUMBER);
    return false;
  }
  if (isInvalidRange(money)) {
    alert(AlertMessage.INVALID_RANGE);
    return false;
  }
  if (isNotThousandMultiples(money)) {
    alert(AlertMessage.NOT_THOUSAND_MULTIPLES);
    return false;
  }
  return true;
};

const isInvalidRange = (money) => {
  return (
    money < StandardNumber.MIN_PURCHASE_PRICE ||
    StandardNumber.MAX_PURCHASE_PRICE < money
  );
};

const isNotThousandMultiples = (money) => {
  return money % StandardNumber.ONE_TICKET_PRICE !== 0;
};

const isInValidNumber = (money) => {
  return !/^[0-9]+$/.test(money);
};
