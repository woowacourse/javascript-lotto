import { MONEY_INPUT } from './constants';

const isThousandMultiple = (money) => money % MONEY_INPUT.MIN_PRICE === 0;
const isOverThouand = (money) => money >= MONEY_INPUT.MIN_PRICE;
const isUnderMillion = (money) => money <= MONEY_INPUT.MAX_PRICE;
const isValidMoneyRange = (money) => isOverThouand(money) && isUnderMillion(money);

export const isValidMoneyInput = (money) =>
  isThousandMultiple(money) &&
  isOverThouand(money) &&
  isUnderMillion(money) &&
  isValidMoneyRange(money);
