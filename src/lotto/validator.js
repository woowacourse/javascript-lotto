import { LOTTO_PRICE } from '../constants.js';

export default {
  isChangeMoneyExist(cost) {
    return cost % 1000 !== 0;
  },
  isMoneyLessThanMinCost(cost) {
    return cost < LOTTO_PRICE;
  },
};
