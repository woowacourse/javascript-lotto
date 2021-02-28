import { VALUE } from '../utils/constant.js';

export const isValidPrice = (price) => {
  return price >= VALUE.LOTTO.TICKET_PRICE;
};
export const isDuplicate = (nums) => {
  return new Set(nums).size !== nums.length;
};

export const isValidRange = (nums) => {
  return nums.every(
    (num) => VALUE.LOTTO.MIN_NUM <= num && num <= VALUE.LOTTO.MAX_NUM,
  );
};

export const isEqual = (value1, value2) => {
  return value1 === value2;
};
