import { MONEY_INPUT } from './constants';

const isThousandMultiple = money => money % MONEY_INPUT.MIN === 0;
const isOverThouand = money => money >= MONEY_INPUT.MIN;
const isUnderMillion = money => money <= MONEY_INPUT.MAX;
const isValidMoneyRange = money => isOverThouand(money) && isUnderMillion(money);

export const isValidMoneyInput = money => isThousandMultiple(money) && isOverThouand(money) && isUnderMillion(money) && isValidMoneyRange(money);
