import { ALERT_MESSAGE, STANDARD_NUMBER } from "./constants.js";

export const isValidMoney = (money) => {
  if (isInValidNumber(money)) {
    alert(ALERT_MESSAGE.STRING_AND_BLANK_FORBIDDEN);
    return false;
  }
  if (isInvalidPriceRange(money)) {
    alert(ALERT_MESSAGE.OUT_OF_MONEY_RANGE);
    return false;
  }
  if (isNotThousandMultiples(money)) {
    alert(ALERT_MESSAGE.NOT_THOUSAND_MULTIPLES);
    return false;
  }
  return true;
};

const isInvalidPriceRange = (money) => {
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

export const isValidWinningNumbers = (array) => {
  if (isBlankIncluded(array)) {
    alert(ALERT_MESSAGE.BLANK_FORBIDDEN);
    return;
  }
  if (isInvalidLottoNumberRange(array)) {
    alert(ALERT_MESSAGE.OUT_OF_WINNING_NUMBER_RANGE);
    return;
  }
  if (isDuplicatedNumber(array)) {
    alert(ALERT_MESSAGE.DUPLICATED_INPUT_FORBIDDEN);
    return;
  }
  return true;
};

export const isBlankIncluded = (array) => {
  return array.includes("");
};

export const isInvalidLottoNumberRange = (array) => {
  return !array.every(
    (num) =>
      num >= STANDARD_NUMBER.MIN_LOTTO_NUMBER &&
      num <= STANDARD_NUMBER.MAX_LOTTO_NUMBER
  );
};

export const isDuplicatedNumber = (array) => {
  return array.length !== new Set(array).size;
};
