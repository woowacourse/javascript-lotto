import { VALUE } from '../utils/constant.js';

export const isValidPrice = (price) => {
  return price >= VALUE.LOTTO.TICKET_PRICE;
};
export const isDuplicate = (nums) => {
  return new Set(nums).size !== nums.length;
};

const isValidMinNumber = (num) => {
  return VALUE.LOTTO.MIN_NUM <= num;
};

const isValidMaxNumber = (num) => {
  return num <= VALUE.LOTTO.MAX_NUM;
};

export const isValidRange = (nums) => {
  return nums.every((num) => isValidMinNumber(num) && isValidMaxNumber(num));
};
