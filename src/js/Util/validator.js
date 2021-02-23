import { ALERT_MESSAGE, STANDARD_NUMBER } from "./constants.js";

export const isValidMoney = (money) => {
  if (isInValidNumber(money)) {
    alert(ALERT_MESSAGE.INVALID_NUMBER);
    return false;
  }
  if (isInvalidRange(money)) {
    alert(ALERT_MESSAGE.INVALID_RANGE);
    return false;
  }
  if (isNotThousandMultiples(money)) {
    alert(ALERT_MESSAGE.NOT_THOUSAND_MULTIPLES);
    return false;
  }
  return true;
};

const isInvalidRange = (money) => {
  return (
    money < STANDARD_NUMBER.MIN_PURCHASE_PRICE ||
    STANDARD_NUMBER.MAX_PURCHASE_PRICE < money
  );
};

const isNotThousandMultiples = (money) => {
  return money % STANDARD_NUMBER.ONE_TICKET_PRICE !== 0;
};

const isInValidNumber = (money) => {
  return !/^[0-9]+$/.test(money);
};
