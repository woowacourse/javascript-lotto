import { MONEY_INPUT } from '../constants/constants';

export const isValidMoneyInput = (money) => {
  return (
    money % MONEY_INPUT.MIN_PRICE === 0 &&
    money >= MONEY_INPUT.MIN_PRICE &&
    money <= MONEY_INPUT.MAX_PRICE
  );
};
