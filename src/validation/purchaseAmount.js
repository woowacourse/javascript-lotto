import { ERROR_MESSAGE } from '../constants/message';
import NUMBER from '../constants/number';

const PurchaseAmountValidation = {
  validate(moneyString = '') {
    const money = Number(moneyString);
    if (money % NUMBER.LOTTO_PRICE !== 0 || !Number.isInteger(money) || money < NUMBER.LOTTO_PRICE)
      throw new Error(`${ERROR_MESSAGE.PREFIX} ${ERROR_MESSAGE.PURCHASE_AMOUNT}`);
  },
};

export default PurchaseAmountValidation;
