import { MONEY_INPUT, WINNING_LOTTO_DIGIT } from './constants';

export const isThousandMultiple = money => money % MONEY_INPUT.MIN_PRICE === 0;

export const isOverThouand = money => money >= MONEY_INPUT.MIN_PRICE;

export const isUnderTenThousand = money => money <= MONEY_INPUT.MAX_PRICE;

export const isValidMoneyRange = money => isOverThouand(money) && isUnderTenThousand(money);

export const isValidMoneyInput = money => {
  return isThousandMultiple(money) && 
         isValidMoneyRange(money);
}

export const isDuplicatedLottos = lottos => new Set([...lottos]).size !== WINNING_LOTTO_DIGIT;
