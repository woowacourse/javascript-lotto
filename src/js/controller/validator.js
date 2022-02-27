import { MONEY_INPUT } from '../constants/constants';

const isThousandMultiple = (money) => money % MONEY_INPUT.MIN_PRICE === 0;
const isValidMoneyRange = (money) =>
  money >= MONEY_INPUT.MIN_PRICE && money <= MONEY_INPUT.MAX_PRICE;

export const isValidMoneyInput = (money) => isThousandMultiple(money) && isValidMoneyRange(money);
