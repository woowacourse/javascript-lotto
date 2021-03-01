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

export const isValidNumbers = (numbers) => {
  if (isBlankIncluded(numbers)) {
    alert(ALERT_MESSAGE.BLANK_FORBIDDEN);
    return;
  }
  if (isInvalidLottoNumberRange(numbers)) {
    alert(ALERT_MESSAGE.OUT_OF_WINNING_NUMBER_RANGE);
    return;
  }
  if (isDuplicatedNumber(numbers)) {
    alert(ALERT_MESSAGE.DUPLICATED_INPUT_FORBIDDEN);
    return;
  }
  return true;
};

export const isBlankIncluded = (numbers) => {
  return numbers.includes("");
};

export const isInvalidLottoNumberRange = (numbers) => {
  return !numbers.every(
    (num) =>
      num >= STANDARD_NUMBER.MIN_LOTTO_NUMBER &&
      num <= STANDARD_NUMBER.MAX_LOTTO_NUMBER
  );
};

export const isDuplicatedNumber = (numbers) => {
  return numbers.length !== new Set(numbers).size;
};

export const isUnderCurrentBalance = (currentBalance, autoPurchasePrice) => {
  if (currentBalance < autoPurchasePrice) {
    alert(ALERT_MESSAGE.OVER_CURRENT_BALANCE);
    return;
  }

  return true;
};
