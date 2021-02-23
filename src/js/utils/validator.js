import { VALUE } from '../utils/constant.js';

export const isValidPrice = (price) => {
  return price >= VALUE.LOTTO.TICKET_PRICE;
};
export const isDuplicate = (nums) => {
  return new Set(nums).size !== nums.length;
};

export const isValidRange = (num) => {
  return VALUE.LOTTO.MIN_NUM <= num && num <= VALUE.LOTTO.MAX_NUM;
};
