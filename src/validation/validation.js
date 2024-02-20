import MESSAGE from '../constants/message';
import { NUMBER } from '../constants/number';

const validation = {
  purchaseAmount(moneyString) {
    const money = Number(moneyString);
    if (
      money % NUMBER.LOTTO_PRICE !== 0 ||
      !Number.isInteger(money) ||
      money < NUMBER.LOTTO_PRICE
    )
      throw new Error(MESSAGE.ERROR.PURCHASE_AMOUNT_ERROR);
  },
};

export default validation;
