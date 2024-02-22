import MESSAGE from '../constants/message';
import NUMBER from '../constants/number';

const PurchaseAmountValidation = {
  validate(moneyString = '') {
    const money = Number(moneyString);
    if (money % NUMBER.LOTTO_PRICE !== 0 || !Number.isInteger(money) || money < NUMBER.LOTTO_PRICE)
      throw new Error(`${MESSAGE.ERROR.PREFIX} ${MESSAGE.ERROR.PURCHASE_AMOUNT}`);
  },
};

export default PurchaseAmountValidation;
